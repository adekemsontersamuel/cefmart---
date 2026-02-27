-- CEFMART multi-vendor production schema
-- Run in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.tbl_customer (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tbl_vendoor (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  vendor_name text not null,
  vendor_type text not null,
  contact_person text,
  phone text,
  description text,
  address text,
  city text,
  state text,
  zip_code text,
  location text,
  business_license text,
  tax_id text,
  website text,
  specialties text,
  certifications text,
  verified boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tbl_admin (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email text not null unique,
  full_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table if exists public.tbl_vendoor
  add column if not exists verified boolean not null default false,
  add column if not exists is_active boolean not null default true,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.tbl_category (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tbl_product (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.tbl_vendoor(id) on delete cascade,
  category_id uuid references public.tbl_category(id) on delete set null,
  name text not null,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  unit text not null default 'per item',
  image_url text,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  freshness_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tbl_order (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.tbl_customer(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending','processing','completed','cancelled')),
  total_amount numeric(12,2) not null default 0,
  shipping_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tbl_order_item (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.tbl_order(id) on delete cascade,
  vendor_id uuid not null references public.tbl_vendoor(id) on delete restrict,
  product_id uuid not null references public.tbl_product(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  subtotal numeric(12,2) generated always as (quantity * unit_price) stored,
  created_at timestamptz not null default now()
);

create index if not exists idx_tbl_product_vendor on public.tbl_product(vendor_id);
create index if not exists idx_tbl_product_category on public.tbl_product(category_id);
create index if not exists idx_tbl_order_customer on public.tbl_order(customer_id);
create index if not exists idx_tbl_order_item_order on public.tbl_order_item(order_id);
create index if not exists idx_tbl_order_item_vendor on public.tbl_order_item(vendor_id);

alter table public.tbl_admin enable row level security;
alter table public.tbl_customer enable row level security;
alter table public.tbl_category enable row level security;
alter table public.tbl_product enable row level security;
alter table public.tbl_order enable row level security;
alter table public.tbl_order_item enable row level security;
alter table public.tbl_vendoor enable row level security;

-- Admin helper expression
create or replace function public.is_admin_uid(uid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.tbl_admin a
    where a.auth_user_id = uid and a.is_active = true
  );
$$;

-- Categories: public read, admin write
create policy if not exists "categories_read_all" on public.tbl_category
for select using (true);

create policy if not exists "categories_admin_manage" on public.tbl_category
for all using (public.is_admin_uid(auth.uid()))
with check (public.is_admin_uid(auth.uid()));

-- Products: public can read active, vendor owns writes, admin full
create policy if not exists "products_read_active" on public.tbl_product
for select using (status = 'active' or public.is_admin_uid(auth.uid()));

create policy if not exists "products_vendor_manage_own" on public.tbl_product
for all using (
  exists (
    select 1 from public.tbl_vendoor v
    where v.id = vendor_id and v.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.tbl_vendoor v
    where v.id = vendor_id and v.auth_user_id = auth.uid()
  )
);

create policy if not exists "products_admin_manage" on public.tbl_product
for all using (public.is_admin_uid(auth.uid()))
with check (public.is_admin_uid(auth.uid()));

-- Vendors: vendor sees own profile, admin sees all, public sees active verified vendors
create policy if not exists "vendors_public_read_verified" on public.tbl_vendoor
for select using (verified = true and is_active = true);

create policy if not exists "vendors_self_read_write" on public.tbl_vendoor
for all using (auth_user_id = auth.uid())
with check (auth_user_id = auth.uid());

create policy if not exists "vendors_admin_manage" on public.tbl_vendoor
for all using (public.is_admin_uid(auth.uid()))
with check (public.is_admin_uid(auth.uid()));

-- Customers: own profile read/write, admin full
create policy if not exists "customers_self_read_write" on public.tbl_customer
for all using (auth_user_id = auth.uid())
with check (auth_user_id = auth.uid());

create policy if not exists "customers_admin_manage" on public.tbl_customer
for all using (public.is_admin_uid(auth.uid()))
with check (public.is_admin_uid(auth.uid()));

-- Orders: customer own, vendor with items, admin all
create policy if not exists "orders_customer_own" on public.tbl_order
for select using (
  exists (
    select 1 from public.tbl_customer c
    where c.id = customer_id and c.auth_user_id = auth.uid()
  )
);

create policy if not exists "orders_admin_manage" on public.tbl_order
for all using (public.is_admin_uid(auth.uid()))
with check (public.is_admin_uid(auth.uid()));

create policy if not exists "order_items_vendor_read_own" on public.tbl_order_item
for select using (
  exists (
    select 1 from public.tbl_vendoor v
    where v.id = vendor_id and v.auth_user_id = auth.uid()
  )
  or public.is_admin_uid(auth.uid())
);

create policy if not exists "order_items_customer_read" on public.tbl_order_item
for select using (
  exists (
    select 1
    from public.tbl_order o
    join public.tbl_customer c on c.id = o.customer_id
    where o.id = order_id and c.auth_user_id = auth.uid()
  )
);

create policy if not exists "order_items_admin_manage" on public.tbl_order_item
for all using (public.is_admin_uid(auth.uid()))
with check (public.is_admin_uid(auth.uid()));
