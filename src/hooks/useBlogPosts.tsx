
import { useQuery } from '@tanstack/react-query';

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
}

// Temporary mock data until database is set up
const mockPosts: BlogPost[] = [];

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      console.log('Blog posts will be loaded from database once tables are created');
      return mockPosts;
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      console.log('Blog post will be loaded from database once tables are created');
      return null;
    },
    enabled: !!slug,
  });
};
