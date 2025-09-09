-- Database migrations for simplified monetization feature

-- Add price field to events table
ALTER TABLE events ADD COLUMN price DECIMAL(10,2) DEFAULT 0.00;

-- Create simple coupons table for display purposes
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percentage INTEGER DEFAULT 0,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) policies
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for coupons (public read for validation, organizer create)
CREATE POLICY "Coupons are viewable by everyone" ON coupons FOR SELECT USING (true);
CREATE POLICY "Organizers can create coupons" ON coupons FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
