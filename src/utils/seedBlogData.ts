
import { supabase } from "@/integrations/supabase/client";
import { seoArticles } from "@/data/seoArticles";

export const seedBlogData = async () => {
  try {
    console.log('Starting blog data seeding...');

    // Insert blog posts directly to the existing blog_posts table
    for (const article of seoArticles) {
      const { error } = await supabase
        .from('blog_posts')
        .upsert({
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          category: article.category,
          read_time: String(article.read_time), // Ensure it's a string
          published_at: article.published_at,
          author: article.author,
          image_url: article.image_url,
          featured: article.featured || false
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
