create policy "auth read appts" on appointments
for select to authenticated using (true);

create policy "auth write appts" on appointments
for insert with check (true);

create policy "auth update appts" on appointments
for update using (true) with check (true);

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  vehicle jsonb,
  created_at timestamp default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  service text not null,
  day int not null,        -- 1..7 (Lun..Dom)
  start time not null,
  "end" time not null,
  notes text,
  created_at timestamp default now()
);

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  conversions int default 0,
  created_at timestamp default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  source text,
  created_at timestamp default now()
);

alter table clients enable row level security;
alter table appointments enable row level security;
alter table campaigns enable row level security;
alter table leads enable row level security;

create policy "public read clients" on clients for select to anon using (true);
create policy "public read appointments" on appointments for select to anon using (true);
create policy "public read campaigns" on campaigns for select to anon using (true);
create policy "public read leads" on leads for select to anon using (true);
