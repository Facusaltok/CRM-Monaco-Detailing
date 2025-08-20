// /api/whatsapp.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { to, text } = req.body || {};
    if (!to || !text) return res.status(400).json({ error: 'to and text are required' });

    const token = process.env.WHATSAPP_TOKEN;          // Token de App / System User
    const phoneId = process.env.WHATSAPP_PHONE_ID;     // ID del número de WhatsApp
    if (!token || !phoneId) return res.status(500).json({ error: 'Missing WhatsApp env vars' });

    const r = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: text }
      })
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('WhatsApp error:', data);
      return res.status(500).json({ error: 'WhatsApp send failed', details: data });
    }
    return res.status(200).json({ ok: true, data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}
