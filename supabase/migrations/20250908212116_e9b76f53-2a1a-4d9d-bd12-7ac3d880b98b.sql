-- Security fixes for profiles, analytics_events, and media_files tables

-- 1. Fix profiles table - restrict viewing to authenticated users only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles FOR SELECT 
USING (auth.role() = 'authenticated');

-- 2. Fix analytics_events - restrict NULL user_id records to admin access only
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.analytics_events;
DROP POLICY IF EXISTS "Users can insert analytics" ON public.analytics_events;

-- Users can view their own analytics data
CREATE POLICY "Users can view their own analytics" 
ON public.analytics_events FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can view all analytics including NULL user_id records
CREATE POLICY "Admins can view all analytics" 
ON public.analytics_events FOR SELECT 
USING (public.is_admin());

-- Users can insert their own analytics or anonymous analytics (NULL user_id)
CREATE POLICY "Users can insert analytics" 
ON public.analytics_events FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 3. Fix media_files - tighten access controls
DROP POLICY IF EXISTS "Users can view their own media" ON public.media_files;
DROP POLICY IF EXISTS "Users can insert media" ON public.media_files;

-- Users can only view their own media files
CREATE POLICY "Users can view their own media" 
ON public.media_files FOR SELECT 
USING (auth.uid() = user_id);

-- Admins can view all media files including NULL user_id records
CREATE POLICY "Admins can view all media" 
ON public.media_files FOR SELECT 
USING (public.is_admin());

-- Users can only insert media with their own user_id (no NULL user_id allowed)
CREATE POLICY "Users can insert their own media" 
ON public.media_files FOR INSERT 
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);