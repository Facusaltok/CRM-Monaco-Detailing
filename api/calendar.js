// /api/calendar.js
export default async function handler(req, res) {
  try {
    const key = process.env.GOOGLE_API_KEY;
    if (!key) return res.status(500).json({ error: "Missing GOOGLE_API_KEY" });

    const { calendarId, timeMin, timeMax, maxResults = 50 } = req.query;
    const cal = calendarId || process.env.GOOGLE_CALENDAR_ID;
    if (!cal) return res.status(400).json({ error: "calendarId or GOOGLE_CALENDAR_ID required" });

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cal)}/events`);
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("maxResults", String(maxResults));
    if (timeMin) url.searchParams.set("timeMin", timeMin);
    if (timeMax) url.searchParams.set("timeMax", timeMax);
    url.searchParams.set("key", key);

    const r = await fetch(url);
    const j = await r.json();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=600");
    res.status(200).json(j);
  } catch (e) {
    res.status(500).json({ error: e.message || "calendar error" });
  }
}
