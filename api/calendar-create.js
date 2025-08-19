// /api/calendar-create.js
import { google } from 'googleapis';
import { getGoogleAuth } from './_google.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { calendarId, summary, description, start, end, timeZone } = req.body || {};
    if (!calendarId || !summary || !start || !end) {
      res.status(400).json({ error: 'calendarId, summary, start y end son requeridos' });
      return;
    }

    const auth = getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
      summary,
      description,
      start: { dateTime: start, timeZone: timeZone || 'America/Argentina/Buenos_Aires' },
      end:   { dateTime: end,   timeZone: timeZone || 'America/Argentina/Buenos_Aires' }
    };

    const { data } = await calendar.events.insert({
      calendarId,
      requestBody: event
    });

    res.status(200).json({ ok: true, event: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
