# Monaco Detailing CRM

- Login/registro/recuperación (Supabase Auth)
- CRUD: Clientes, Citas (Agenda), Leads, Campañas
- Agenda semanal + lectura de Google Calendar
- Opcional: crear evento en Google (OAuth) con `/api/calendar-create`
- PWA (manifest + sw)

## Variables
- Supabase: editar `supabaseClient.js` (URL + anon)
- Vercel (Project → Settings → Environment Variables):
  - `GOOGLE_API_KEY` (para `/api/calendar`)
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` (para acceso con service account)
  - (opcional) `GOOGLE_CALENDAR_ID`
  - (opcional) `GOOGLE_OAUTH_ACCESS_TOKEN` (para `/api/calendar-create`)

## Supabase
1. Auth → Providers → Email: habilitar Email+Password (y Magic Link si querés).
2. Auth → URL Configuration:
   - Site URL: `https://crm-monaco-detailing.vercel.app/`
   - Redirects: `https://crm-monaco-detailing.vercel.app/dashboard.html`, `http://localhost:8080/dashboard.html`
3. Ejecutar `schema.sql`.

## Dev
```bash
python -m http.server 8080
# http://localhost:8080
