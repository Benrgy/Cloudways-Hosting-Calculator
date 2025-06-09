
import { supabase } from "@/integrations/supabase/client";
import { seoArticles } from "@/data/seoArticles";

export const seedBlogData = async () => {
  try {
    // First, create the categories with meta descriptions
    const categories = [
      {
        name: "Migration Guides",
        slug: "migration-guides",
        description: "Step-by-step guides for migrating from shared hosting to Cloudways managed cloud hosting",
        meta_title: "Migration Guides - Shared Hosting to Cloudways",
        meta_description: "Complete migration guides for switching from shared hosting to Cloudways. Learn the process, costs, benefits, and get free migration assistance.",
        color: "#059669"
      },
      {
        name: "Performance Optimization", 
        slug: "performance-optimization",
        description: "Techniques and strategies to optimize website performance on Cloudways cloud hosting",
        meta_title: "Performance Optimization Guides - Cloudways Speed Tips",
        meta_description: "Expert performance optimization guides for Cloudways. Learn caching, CDN setup, image optimization, and advanced techniques for lightning-fast websites.",
        color: "#0891b2"
      },
      {
        name: "Cost Comparison",
        slug: "cost-comparison", 
        description: "Detailed cost analysis comparing shared hosting vs Cloudways pricing and value",
        meta_title: "Cost Comparison - Shared Hosting vs Cloudways Pricing",
        meta_description: "Transparent cost comparison between shared hosting and Cloudways. Discover hidden fees, true pricing, and why Cloudways offers better value for money.",
        color: "#7c3aed"
      }
    ];

    // Insert categories
    for (const category of categories) {
      const { error } = await supabase
        .from('categories')
        .upsert(category, { onConflict: 'slug' });
      
      if (error) {
        console.error('Error inserting category:', error);
      } else {
        console.log(`Category "${category.name}" added successfully`);
      }
    }

    // Insert blog posts
    for (const article of seoArticles) {
      const { error } = await supabase
        .from('posts')
        .upsert({
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          category: article.category,
          read_time: article.read_time,
          published_at: article.published_at,
          author: article.author,
          image_url: article.image_url,
          featured: article.featured,
          meta_title: article.meta_title,
          meta_description: article.meta_description,
          og_title: article.og_title,
          og_description: article.og_description,
          seo_keywords: article.seo_keywords,
          focus_keyword: article.focus_keyword,
          status: 'published'
        }, { onConflict: 'slug' });

      if (error) {
        console.error('Error inserting article:', error);
      } else {
        console.log(`Article "${article.title}" added successfully`);
      }
    }

    console.log('Blog data seeding completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error seeding blog data:', error);
    return { success: false, error };
  }
};
