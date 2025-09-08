-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  company TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics_events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  session_id TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved_calculations table
CREATE TABLE public.saved_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  inputs JSONB NOT NULL DEFAULT '{}',
  results JSONB NOT NULL DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media_files table
CREATE TABLE public.media_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email_subscribers table
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT DEFAULT 'calculator',
  preferences JSONB DEFAULT '{"newsletter": true, "updates": true, "marketing": false}',
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create hosting_providers table
CREATE TABLE public.hosting_providers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hosting_plans table
CREATE TABLE public.hosting_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_id UUID NOT NULL REFERENCES public.hosting_providers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_annual DECIMAL(10,2),
  storage_gb INTEGER,
  bandwidth_gb INTEGER,
  domains INTEGER,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hosting_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for analytics_events
CREATE POLICY "Users can view their own analytics" ON public.analytics_events FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert analytics" ON public.analytics_events FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- RLS Policies for saved_calculations
CREATE POLICY "Users can view their own calculations" ON public.saved_calculations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own calculations" ON public.saved_calculations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own calculations" ON public.saved_calculations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own calculations" ON public.saved_calculations FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for media_files
CREATE POLICY "Users can view their own media" ON public.media_files FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert media" ON public.media_files FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their own media" ON public.media_files FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own media" ON public.media_files FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for email_subscribers
CREATE POLICY "Service can manage email subscribers" ON public.email_subscribers FOR ALL USING (true);

-- RLS Policies for hosting data
CREATE POLICY "Anyone can view hosting providers" ON public.hosting_providers FOR SELECT USING (true);
CREATE POLICY "Anyone can view hosting plans" ON public.hosting_plans FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage hosting data" ON public.hosting_providers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage hosting plans" ON public.hosting_plans FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_saved_calculations_updated_at BEFORE UPDATE ON public.saved_calculations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON public.media_files FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hosting_providers_updated_at BEFORE UPDATE ON public.hosting_providers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hosting_plans_updated_at BEFORE UPDATE ON public.hosting_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample hosting data
INSERT INTO public.hosting_providers (name, description, website_url) VALUES
('HostGator', 'Reliable web hosting with 24/7 support', 'https://hostgator.com'),
('Bluehost', 'WordPress recommended hosting provider', 'https://bluehost.com'),
('SiteGround', 'Fast and secure hosting solutions', 'https://siteground.com');

INSERT INTO public.hosting_plans (provider_id, name, price_monthly, price_annual, storage_gb, bandwidth_gb, domains, features) 
SELECT 
  p.id,
  'Shared Hosting',
  9.99,
  99.99,
  100,
  1000,
  1,
  ARRAY['SSL Certificate', '24/7 Support', 'Email Accounts']
FROM public.hosting_providers p
WHERE p.name = 'HostGator';

INSERT INTO public.hosting_plans (provider_id, name, price_monthly, price_annual, storage_gb, bandwidth_gb, domains, features) 
SELECT 
  p.id,
  'Basic Plan',
  7.99,
  79.99,
  50,
  NULL,
  1,
  ARRAY['Free Domain', 'SSL Certificate', 'WordPress Install']
FROM public.hosting_providers p
WHERE p.name = 'Bluehost';