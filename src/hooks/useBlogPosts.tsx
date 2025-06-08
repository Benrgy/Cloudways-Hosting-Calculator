
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  image_url: string;
  published_at: string;
  author: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  seo_keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  schema_type?: string;
  robots_meta?: string;
  breadcrumbs?: boolean;
  seo_score?: number;
  readability_score?: number;
  word_count?: number;
  internal_links?: number;
  external_links?: number;
  images_count?: number;
  alt_texts_missing?: number;
  h1_count?: number;
  h2_count?: number;
  h3_count?: number;
}

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      console.log('Loading blog posts from Supabase...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
      }

      console.log('Blog posts loaded:', data);
      return data as BlogPost[];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Loading blog post with slug:', slug);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('Blog post not found:', slug);
          return null;
        }
        console.error('Error fetching blog post:', error);
        throw error;
      }

      console.log('Blog post loaded:', data);
      return data as BlogPost;
    },
    enabled: !!slug,
  });
};
