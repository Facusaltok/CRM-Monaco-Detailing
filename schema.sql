-- CLIENTES
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  vehicle jsonb,     -- {brand,model,year,color}
  service text,
  duration text,
  maintenance text,
  price numeric,
  notes text,
  created_at timestamptz default now()
);

-- CITAS
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  service text not null,
  day int not null,          -- 1..7 (Lun..Dom)
  start time not null,
  "end" time not null,
  notes text,
  created_at timestamptz default now()
);

-- GASTOS
create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  date date,
  description text,
  amount numeric,
  category text,
  status text,
  created_at timestamptz default now()
);

-- LEADS
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  client_name text,
  source text,               -- Instagram, Facebook, Web, WhatsApp, Referido
  status text default 'Nuevo', -- Nuevo, Contactado, Calificado, Ganado, Perdido
  notes text,
  created_at timestamptz default now()
);

-- CAMPAÑAS
create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  channel text,              -- Instagram, Google Ads, etc.
  budget numeric,
  conversions int default 0,
  created_at timestamptz default now()
);

-- RLS
alter table clients enable row level security;
alter table appointments enable row level security;
alter table expenses enable row level security;
alter table leads enable row level security;
alter table campaigns enable row level security;

-- Políticas: usuarios autenticados pueden leer/escribir (ajusta a tu gusto)
create policy "auth read clients" on clients for select to authenticated using (true);
create policy "auth write clients" on clients for insert with check (true);
create policy "auth update clients" on clients for update using (true) with check (true);
create policy "auth delete clients" on clients for delete using (true);

create policy "auth read appts" on appointments for select to authenticated using (true);
create policy "auth write appts" on appointments for insert with check (true);
create policy "auth update appts" on appointments for update using (true) with check (true);
create policy "auth delete appts" on appointments for delete using (true);

create policy "auth read expenses" on expenses for select to authenticated using (true);
create policy "auth write expenses" on expenses for insert with check (true);
create policy "auth update expenses" on expenses for update using (true) with check (true);
create policy "auth delete expenses" on expenses for delete using (true);

create policy "auth read leads" on leads for select to authenticated using (true);
create policy "auth write leads" on leads for insert with check (true);
create policy "auth update leads" on leads for update using (true) with check (true);
create policy "auth delete leads" on leads for delete using (true);

create policy "auth read campaigns" on campaigns for select to authenticated using (true);
create policy "auth write campaigns" on campaigns for insert with check (true);
create policy "auth update campaigns" on campaigns for update using (true) with check (true);
create policy "auth delete campaigns" on campaigns for delete using (true);
