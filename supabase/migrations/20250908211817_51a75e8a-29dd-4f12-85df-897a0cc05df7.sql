-- First, create user roles system for proper access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- Now fix the email_subscribers security issue
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service can manage email subscribers" ON public.email_subscribers;

-- Create secure policies for email_subscribers
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.email_subscribers FOR INSERT 
WITH CHECK (true);  -- Allow public newsletter signups

CREATE POLICY "Only admins can view subscribers" 
ON public.email_subscribers FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Only admins can update subscribers" 
ON public.email_subscribers FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Only admins can delete subscribers" 
ON public.email_subscribers FOR DELETE 
USING (public.is_admin());

-- Users can update their own subscription status (unsubscribe)
CREATE POLICY "Users can unsubscribe themselves" 
ON public.email_subscribers FOR UPDATE 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()))
WITH CHECK (
  email = (SELECT email FROM auth.users WHERE id = auth.uid()) 
  AND unsubscribed_at IS NOT NULL
);