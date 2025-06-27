
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  role TEXT DEFAULT 'user',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved calculations table
CREATE TABLE public.saved_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  inputs JSONB NOT NULL,
  results JSONB NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB,
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting providers table
CREATE TABLE public.hosting_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  base_url TEXT,
  pricing_api_endpoint TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting plans table
CREATE TABLE public.hosting_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID REFERENCES public.hosting_providers ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_annual DECIMAL(10,2),
  cpu_cores INTEGER,
  ram_gb INTEGER,
  storage_gb INTEGER,
  bandwidth_gb INTEGER,
  features JSONB DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(provider_id, slug)
);

-- Create email subscribers table
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'calculator',
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{"newsletter": true, "updates": true}'
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for saved calculations
CREATE POLICY "Users can view own calculations" ON public.saved_calculations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own calculations" ON public.saved_calculations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations" ON public.saved_calculations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations" ON public.saved_calculations
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for analytics (users can only see their own)
CREATE POLICY "Users can view own analytics" ON public.analytics_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- RLS Policies for hosting providers (public read)
CREATE POLICY "Anyone can view providers" ON public.hosting_providers
  FOR SELECT USING (is_active = true);

-- RLS Policies for hosting plans (public read)
CREATE POLICY "Anyone can view plans" ON public.hosting_plans
  FOR SELECT USING (is_active = true);

-- RLS Policies for email subscribers (users can only manage their own)
CREATE POLICY "Users can manage own subscription" ON public.email_subscribers
  FOR ALL USING (auth.jwt() ->> 'email' = email);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_calculations_updated_at
  BEFORE UPDATE ON public.saved_calculations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample hosting providers
INSERT INTO public.hosting_providers (name, slug, logo_url, is_active) VALUES
('Cloudways', 'cloudways', '/cloudways-logo.png', true),
('AWS', 'aws', '/aws-logo.png', true),
('Google Cloud', 'google-cloud', '/gcp-logo.png', true),
('DigitalOcean', 'digitalocean', '/do-logo.png', true),
('Vultr', 'vultr', '/vultr-logo.png', true),
('Linode', 'linode', '/linode-logo.png', true);

-- Insert sample hosting plans
WITH provider_ids AS (
  SELECT id, slug FROM public.hosting_providers WHERE slug IN ('cloudways', 'aws', 'digitalocean')
)
INSERT INTO public.hosting_plans (provider_id, name, slug, price_monthly, price_annual, cpu_cores, ram_gb, storage_gb, bandwidth_gb, features, is_popular)
SELECT 
  p.id,
  plan_data.name,
  plan_data.slug,
  plan_data.price_monthly,
  plan_data.price_annual,
  plan_data.cpu_cores,
  plan_data.ram_gb,
  plan_data.storage_gb,
  plan_data.bandwidth_gb,
  plan_data.features::jsonb,
  plan_data.is_popular
FROM provider_ids p
CROSS JOIN (
  VALUES 
    ('cloudways', 'DO Starter', 'do-starter', 10.00, 108.00, 1, 1, 25, 1000, '{"ssl": true, "backup": "daily", "cdn": false}', false),
    ('cloudways', 'DO Standard', 'do-standard', 22.00, 237.60, 1, 2, 50, 2000, '{"ssl": true, "backup": "daily", "cdn": true}', true),
    ('cloudways', 'DO Advanced', 'do-advanced', 42.00, 453.60, 2, 4, 80, 4000, '{"ssl": true, "backup": "daily", "cdn": true}', false),
    ('digitalocean', 'Basic Droplet', 'basic', 12.00, 129.60, 1, 1, 25, 1000, '{"ssl": false, "backup": "manual", "cdn": false}', false),
    ('digitalocean', 'Professional', 'professional', 24.00, 259.20, 2, 2, 50, 2000, '{"ssl": true, "backup": "weekly", "cdn": false}', false),
    ('aws', 't3.micro', 't3-micro', 8.50, 91.80, 2, 1, 20, 1000, '{"ssl": true, "backup": "snapshot", "cdn": true}', false),
    ('aws', 't3.small', 't3-small', 17.00, 183.60, 2, 2, 20, 2000, '{"ssl": true, "backup": "snapshot", "cdn": true}', false)
) AS plan_data(provider_slug, name, slug, price_monthly, price_annual, cpu_cores, ram_gb, storage_gb, bandwidth_gb, features, is_popular)
WHERE p.slug = plan_data.provider_slug;
