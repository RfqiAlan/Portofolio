// POST /api/bayar  { "amount": 10000 }  ->  { checkout_url, order_id, total_amount }
// Membuat transaksi QRISGate dari server, supaya API key tidak pernah sampai ke browser.
// Env wajib: QRISGATE_API_KEY. Opsional: SITE_URL (mis. https://portofolio-rfqialan.vercel.app)
const crypto = require('crypto');

const QRISGATE_API = 'https://qrisgate.web.id/api/v1/transactions';
const CHECKOUT_PREFIX = 'https://qrisgate.web.id/';
const MAX_AMOUNT = 10000000;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const apiKey = process.env.QRISGATE_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'not_configured' });

  const amount = Number(req.body && req.body.amount);
  if (!Number.isInteger(amount) || amount < 1 || amount > MAX_AMOUNT) {
    return res.status(400).json({ error: 'invalid_amount' });
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const site = (process.env.SITE_URL || `https://${host}`).replace(/\/+$/, '');
  const orderId = `PORTO-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  try {
    const r = await fetch(QRISGATE_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        external_order_id: orderId,
        amount,
        payment_method: 'QRIS',
        return_url: `${site}/terima-kasih?order=${encodeURIComponent(orderId)}`
      }),
      signal: AbortSignal.timeout(10000)
    });

    const json = await r.json().catch(() => ({}));
    const data = json && json.data;
    if (!r.ok || !data || typeof data.checkout_url !== 'string' || !data.checkout_url.startsWith(CHECKOUT_PREFIX)) {
      console.error('QRISGate menolak transaksi', r.status, json && json.error);
      return res.status(502).json({ error: 'gateway_error' });
    }

    return res.status(200).json({
      order_id: data.external_order_id || orderId,
      total_amount: data.total_amount,
      checkout_url: data.checkout_url,
      expires_at: data.expires_at
    });
  } catch (e) {
    console.error('QRISGate tidak bisa dihubungi', e && e.message);
    return res.status(502).json({ error: 'gateway_unreachable' });
  }
};
