// POST /api/webhook  (dipanggil QRISGate saat status transaksi berubah)
// Tanda tangan diverifikasi: HMAC_SHA256(timestamp + "." + rawBody, QRISGATE_WEBHOOK_SECRET).
// Env wajib: QRISGATE_WEBHOOK_SECRET.
// Opsional, untuk notifikasi ke HP Anda: TELEGRAM_BOT_TOKEN dan TELEGRAM_CHAT_ID.
const crypto = require('crypto');

const MAX_AGE_SECONDS = 300;

// Body dibaca mentah dari stream. Jangan sentuh req.body di file ini:
// Vercel akan mem-parse JSON-nya dan byte aslinya (yang ditandatangani) hilang.
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function signatureValid(secret, timestamp, raw, signature) {
  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.`).update(raw).digest();
  const given = Buffer.from(String(signature || '').replace(/^sha256=/, ''), 'hex');
  return given.length === expected.length && crypto.timingSafeEqual(given, expected);
}

async function notifyTelegram(evt) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const rupiah = (n) => 'Rp' + Number(n || 0).toLocaleString('id-ID');
  const paidAt = evt.paid_at
    ? new Date(evt.paid_at).toLocaleString('id-ID', { timeZone: 'Asia/Makassar' }) + ' WITA'
    : '-';
  const text = [
    '✅ Pembayaran QRIS masuk',
    `Total: ${rupiah(evt.total_amount)} (pokok ${rupiah(evt.base_amount)} + kode unik ${evt.unique_code})`,
    `Order: ${evt.external_order_id}`,
    `Waktu: ${paidAt}`
  ].join('\n');

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
    signal: AbortSignal.timeout(5000)
  });
  if (!r.ok) throw new Error(`Telegram ${r.status}`);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const secret = process.env.QRISGATE_WEBHOOK_SECRET;
  if (!secret) return res.status(503).json({ error: 'not_configured' });

  const raw = await readRawBody(req);
  const timestamp = String(req.headers['x-qrisgate-timestamp'] || '');

  if (!/^\d+$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > MAX_AGE_SECONDS) {
    return res.status(401).json({ error: 'stale_timestamp' });
  }
  if (!signatureValid(secret, timestamp, raw, req.headers['x-qrisgate-signature'])) {
    return res.status(401).json({ error: 'invalid_signature' });
  }

  let evt;
  try {
    evt = JSON.parse(raw.toString('utf8'));
  } catch (e) {
    return res.status(400).json({ error: 'invalid_json' });
  }

  // Tercatat di Vercel → Project → Logs.
  console.log('QRISGate webhook', evt.event, evt.external_order_id, evt.total_amount,
    'delivery', req.headers['x-qrisgate-delivery-id'], 'attempt', req.headers['x-qrisgate-attempt']);

  if (evt.event === 'payment.paid') {
    // Gagal kirim Telegram tidak boleh membuat QRISGate mengulang webhook.
    await notifyTelegram(evt).catch((e) => console.error('Notifikasi Telegram gagal', e.message));
  }

  return res.status(200).json({ received: true });
};
