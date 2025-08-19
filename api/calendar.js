// api/calendar.js
export default async function handler(req, res) {
  try {
    const { calendarId, timeMin, timeMax } = req.query;
    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({ error: "Falta GOOGLE_API_KEY" });
    }
    if (!calendarId || !timeMin || !timeMax) {
      return res.status(400).json({ error: "calendarId, timeMin, timeMax son requeridos" });
    }
    const url = new URL("https://www.googleapis.com/calendar/v3/calendars/" + encodeURIComponent(calendarId) + "/events");
    url.searchParams.set("key", process.env.GOOGLE_API_KEY);
    url.searchParams.set("timeMin", timeMin);
    url.searchParams.set("timeMax", timeMax);
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");

    const r = await fetch(url);
    const json = await r.json();
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
