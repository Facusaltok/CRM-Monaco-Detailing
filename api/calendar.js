// /api/calendar.js
import { google } from 'googleapis';
import { getOAuthClient } from './_google.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { calendarId, timeMin, timeMax } = req.query;
    if (!calendarId || !timeMin || !timeMax) {
      res.status(400).json({ error: 'calendarId, timeMin y timeMax son requeridos' });
      return;
    }

    const auth = getOAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const { data } = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime'
    });

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
