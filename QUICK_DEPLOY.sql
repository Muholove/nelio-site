-- =====================================================
-- QUICK DEPLOY - Run this in Supabase SQL Editor
-- Copy and paste everything below into Supabase
-- =====================================================

-- Drop old purchases table
DROP TABLE IF EXISTS public.purchases CASCADE;

-- Create new purchases table
CREATE TABLE IF NOT EXISTS public.purchases (
  id uuid primary key default gen_random_uuid(),
  video_id uuid references public.videos(id) on delete set null,
  buyer_email text not null,
  buyer_name text,
  transaction_id text not null unique,
  payment_method text not null check (payment_method in ('paypal','stripe','crypto')),
  amount numeric(10,2) not null,
  currency text not null default 'eur',
  status text not null default 'completed' check (status in ('pending','completed','failed','refunded')),
  video_title text,
  product_link text,
  metadata jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_purchases_email ON public.purchases(buyer_email);
CREATE INDEX IF NOT EXISTS idx_purchases_transaction_id ON public.purchases(transaction_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON public.purchases(created_at desc);

-- Disable RLS
ALTER TABLE public.purchases DISABLE ROW LEVEL SECURITY;

-- Done! Now deploy your frontend changes

