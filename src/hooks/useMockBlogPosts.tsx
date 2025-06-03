
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

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'migrate-from-shared-hosting-to-cloud',
    title: 'How to Migrate from Shared Hosting to Cloud Hosting',
    excerpt: 'Learn the step-by-step process of migrating your website from shared hosting to modern cloud hosting solutions.',
    content: '<h2>Why Migrate to Cloud Hosting?</h2><p>Cloud hosting offers superior performance, scalability, and reliability compared to traditional shared hosting.</p><h2>Migration Steps</h2><p>1. Backup your current website<br>2. Choose your cloud provider<br>3. Set up your new environment<br>4. Transfer your files<br>5. Update DNS settings</p>',
    category: 'Migration',
    read_time: '8 min read',
    image_url: '/placeholder.svg',
    published_at: '2024-01-15T10:00:00Z',
    author: 'Tech Expert',
    featured: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    slug: 'wordpress-to-cloudways-guide',
    title: 'Complete WordPress Migration to Cloudways',
    excerpt: 'A comprehensive guide to moving your WordPress site to Cloudways cloud hosting platform.',
    content: '<h2>WordPress Migration Made Easy</h2><p>Migrating WordPress to Cloudways is straightforward with their built-in migration tools.</p><h2>Benefits</h2><p>• Improved performance<br>• Better security<br>• Automatic backups<br>• 24/7 support</p>',
    category: 'WordPress',
    read_time: '12 min read',
    image_url: '/placeholder.svg',
    published_at: '2024-01-10T14:30:00Z',
    author: 'WordPress Specialist',
    featured: true,
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z'
  },
  {
    id: '3',
    slug: 'cloud-hosting-benefits',
    title: 'Top 10 Benefits of Cloud Hosting',
    excerpt: 'Discover why businesses are switching from traditional hosting to cloud solutions.',
    content: '<h2>Cloud Hosting Advantages</h2><p>Cloud hosting provides numerous benefits over traditional hosting solutions.</p><h2>Key Benefits</h2><p>1. Scalability<br>2. Reliability<br>3. Cost-effectiveness<br>4. Performance<br>5. Security</p>',
    category: 'Cloud Hosting',
    read_time: '6 min read',
    image_url: '/placeholder.svg',
    published_at: '2024-01-05T09:15:00Z',
    author: 'Cloud Expert',
    featured: false,
    created_at: '2024-01-05T09:15:00Z',
    updated_at: '2024-01-05T09:15:00Z'
  }
];

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockBlogPosts;
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const post = mockBlogPosts.find(p => p.slug === slug);
      if (!post) {
        throw new Error('Blog post not found');
      }
      return post;
    },
    enabled: !!slug,
  });
};
