// Halaman Pembayaran QRIS
// 1. Utama: /api/bayar membuat transaksi QRISGate, pembeli diarahkan ke halaman bayarnya
//    (status lunas terdeteksi otomatis, lalu kembali ke /terima-kasih).
// 2. Cadangan: bila QRISGate belum dipasang atau sedang gangguan, QR bernominal dibuat
//    di browser dari payload QRIS statis di bawah dan pembayaran dikonfirmasi manual.
//    Payload ini bukan rahasia: isinya sama dengan QR yang tercetak di stiker merchant.
const PAY_CONFIG = {
  gatewayEndpoint: '/api/bayar',
  staticQris:
    '00020101021126610016ID.CO.SHOPEE.WWW01189360091800237243530208237243530303UMI' +
    '51440014ID.CO.QRIS.WWW0215ID10265986562250303UMI5204511153033605802ID' +
    '5912Naurah Zahwa6006LANGSA61052441062070703A016304031D',
  whatsapp: '6282292238133',
  quiet: 4,   // margin putih wajib di sekeliling QR (dalam modul)
  scale: 10   // piksel per modul pada gambar asli (tampilan diperkecil lewat CSS)
};

(function () {
  const $ = (id) => document.getElementById(id);
  const form = $('pay-form');
  const input = $('pay-amount');
  const box = $('pay-amount-box');
  const hint = $('pay-hint');
  const chips = Array.from(document.querySelectorAll('.pay-chip'));
  const canvas = $('pay-canvas');
  const submitBtn = form.querySelector('.pay-submit');
  const SUBMIT_LABEL = submitBtn.textContent;
  const HINT_DEFAULT = hint.textContent;

  const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID');
  const digitsOf = (s) => String(s).replace(/\D/g, '').replace(/^0+/, '');

  if (!window.QRIS || !QRIS.isValid(PAY_CONFIG.staticQris)) {
    hint.textContent = 'QRIS sumber tidak valid. Periksa PAY_CONFIG.staticQris di bayar.js.';
    box.classList.add('is-error');
    form.querySelector('.pay-submit').disabled = true;
    return;
  }

  // Data merchant diambil langsung dari payload, supaya selalu sama dengan QR-nya.
  const merchantName = QRIS.getTag(PAY_CONFIG.staticQris, '59') || '-';
  const city = QRIS.getTag(PAY_CONFIG.staticQris, '60') || '-';
  const nmidTag = QRIS.parse(QRIS.getTag(PAY_CONFIG.staticQris, '51') || '')
    .filter((t) => t.id === '02')[0];
  $('pay-merchant-name').textContent = merchantName;
  $('pay-merchant-city').textContent = city.charAt(0) + city.slice(1).toLowerCase();
  $('pay-merchant-nmid').textContent = nmidTag ? nmidTag.value : '-';
  $('pay-step-name').textContent = merchantName;

  function setError(msg) {
    hint.textContent = msg || HINT_DEFAULT;
    box.classList.toggle('is-error', Boolean(msg));
  }

  function setAmountField(n) {
    input.value = n ? n.toLocaleString('id-ID') : '';
    chips.forEach((c) => c.setAttribute('aria-pressed', String(Number(c.dataset.amount) === n)));
  }

  function readAmount() {
    const d = digitsOf(input.value);
    return d ? Number(d) : 0;
  }

  function drawQr(payload, amount) {
    const qr = qrcode(0, 'M');
    qr.addData(payload, 'Byte');
    qr.make();

    const n = qr.getModuleCount();
    const { quiet, scale } = PAY_CONFIG;
    const size = (n + quiet * 2) * scale;
    const caption = Math.round(scale * 7);

    canvas.width = size;
    canvas.height = size + caption;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
      }
    }

    // Keterangan di bawah QR, ikut tersimpan saat gambar diunduh.
    ctx.fillStyle = '#1d1a17';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 ${Math.round(scale * 2.6)}px "Plus Jakarta Sans", system-ui, sans-serif`;
    ctx.fillText(rupiah(amount) + ' · ' + merchantName, size / 2, size + caption / 2 - scale);
    canvas.setAttribute('aria-label', `Kode QRIS ${rupiah(amount)} untuk ${merchantName}`);
  }

  function render(amount) {
    let payload;
    try {
      payload = QRIS.withAmount(PAY_CONFIG.staticQris, amount);
    } catch (e) {
      setError('QR gagal dibuat. Coba nominal lain.');
      return;
    }
    drawQr(payload, amount);

    $('pay-total').textContent = rupiah(amount);
    const msg = `Halo Rifqi, saya sudah membayar ${rupiah(amount)} via QRIS (${merchantName}). Berikut bukti pembayarannya.`;
    $('pay-wa').href = `https://wa.me/${PAY_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    $('pay-download').dataset.amount = String(amount);

    $('pay-empty').hidden = true;
    $('pay-filled').hidden = false;
  }

  function showLocal(amount) {
    render(amount);
    if (window.matchMedia('(max-width: 820px)').matches) {
      $('pay-result').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Hasil: { url } bila QRISGate siap, { fallback: true, reason } bila harus pakai QR cadangan.
  async function createGatewayPayment(amount) {
    try {
      const r = await fetch(PAY_CONFIG.gatewayEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const json = await r.json().catch(() => ({}));
      if (r.ok && json.checkout_url) return { url: json.checkout_url };
      if (r.status === 400) return { error: 'Nominal tidak valid.' };
      // 404/501: tidak ada server (tes lokal). 503: API key belum dipasang.
      const silent = r.status === 404 || r.status === 501 || json.error === 'not_configured';
      return { fallback: true, reason: silent ? '' : 'gateway' };
    } catch (e) {
      return { fallback: true, reason: 'gateway' };
    }
  }

  let busy = false;
  async function submit() {
    if (busy) return;
    const amount = readAmount();
    if (!amount) return setError('Masukkan nominal terlebih dahulu.');
    if (amount > QRIS.MAX_AMOUNT) return setError('Maksimal Rp10.000.000 per transaksi QRIS.');
    setError('');

    busy = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Menyiapkan pembayaran…';
    const result = await createGatewayPayment(amount);

    if (result.url) {
      submitBtn.textContent = 'Membuka halaman bayar…';
      window.location.assign(result.url);
      return; // tombol tetap terkunci sampai halaman berpindah
    }

    busy = false;
    submitBtn.disabled = false;
    submitBtn.textContent = SUBMIT_LABEL;
    if (result.error) return setError(result.error);
    if (result.reason === 'gateway') {
      setError('Pembayaran otomatis sedang gangguan. Pakai QR di bawah, lalu konfirmasi via WhatsApp.');
    }
    showLocal(amount);
  }

  input.addEventListener('input', () => {
    const d = digitsOf(input.value).slice(0, 9);
    setAmountField(d ? Number(d) : 0);
    setError('');
  });

  chips.forEach((chip) => {
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      setAmountField(Number(chip.dataset.amount));
      setError('');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submit();
  });

  $('pay-download').addEventListener('click', (e) => {
    const amount = e.currentTarget.dataset.amount || 'qris';
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qris-rp${amount}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  });

  // Link siap pakai: /bayar?nominal=10000 langsung menampilkan QR.
  const preset = Number(digitsOf(new URLSearchParams(location.search).get('nominal') || ''));
  if (preset) {
    setAmountField(preset);
    submit();
  }
})();
