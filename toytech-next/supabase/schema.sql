create table if not exists public.site_content (
  id text primary key,
  translations jsonb not null,
  services jsonb not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.site_content enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage site content" on public.site_content;
create policy "Admins can manage site content"
on public.site_content
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (
  auth.uid() = user_id
  or exists (
    select 1
    from public.admin_users as admins
    where admins.user_id = auth.uid()
  )
);

drop policy if exists "Admins can manage admin users" on public.admin_users;
create policy "Admins can manage admin users"
on public.admin_users
for all
to authenticated
using (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

insert into public.site_content (id, translations, services)
values (
  'site',
  '{}'::jsonb,
  '[]'::jsonb
)
on conflict (id) do nothing;
