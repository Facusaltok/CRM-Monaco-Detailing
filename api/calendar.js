// /api/calendar-create.js
// Esqueleto: crea un evento en Google Calendar (requiere OAuth2 server-side)
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { accessToken } = await getAccessTokenFromRefresh(); // IMPLEMENTAR
    const { calendarId, summary, startISO, endISO, description='' } = req.body || {};
    if (!calendarId || !summary || !startISO || !endISO) return res.status(400).json({ error: 'Missing fields' });

    const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        summary, description,
        start: { dateTime: startISO },
        end:   { dateTime: endISO }
      })
    });
    const j = await r.json();
    res.status(r.ok ? 200 : r.status).json(j);
  } catch (e) {
    res.status(500).json({ error: e.message || 'calendar-create error' });
  }
}

// TODO: implementá intercambio RefreshToken -> AccessToken con CLIENT_ID/SECRET y REFRESH_TOKEN
async function getAccessTokenFromRefresh(){ throw new Error('OAuth pendiente'); }
