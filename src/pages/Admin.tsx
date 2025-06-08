
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ImageUpload";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { SEOAnalyzer } from "@/components/SEOAnalyzer";
import { SEOMetaFields } from "@/components/SEOMetaFields";
import { SEOPreview } from "@/components/SEOPreview";
import { SlugGenerator } from "@/components/SlugGenerator";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, BarChart3, TrendingUp, Eye, Search, Target, Star, Calendar, User, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "@/hooks/useBlogPosts";

interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  image_url: string;
  author: string;
  featured: boolean;
  // SEO fields
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  seo_keywords: string[];
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  schema_type: string;
  robots_meta: string;
  breadcrumbs: boolean;
}

const Admin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BlogPostForm>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      read_time: "",
      image_url: "",
      author: "",
      featured: false,
      meta_title: "",
      meta_description: "",
      focus_keyword: "",
      seo_keywords: [],
      canonical_url: "",
      og_title: "",
      og_description: "",
      og_image: "",
      twitter_title: "",
      twitter_description: "",
      twitter_image: "",
      schema_type: "Article",
      robots_meta: "index,follow",
      breadcrumbs: true,
    },
  });

  // Fetch blog posts from Supabase
  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      console.log('Loading admin blog posts from Supabase...');
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin blog posts:', error);
        throw error;
      }

      console.log('Admin blog posts loaded:', data);
      return data as BlogPost[];
    },
  });

  // Save/update blog post
  const saveMutation = useMutation({
    mutationFn: async (values: BlogPostForm) => {
      console.log('Saving blog post:', values);
      
      const postData = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        category: values.category,
        read_time: values.read_time,
        image_url: values.image_url,
        author: values.author,
        featured: values.featured,
        meta_title: values.meta_title || null,
        meta_description: values.meta_description || null,
        focus_keyword: values.focus_keyword || null,
        seo_keywords: values.seo_keywords?.length ? values.seo_keywords : null,
        canonical_url: values.canonical_url || null,
        og_title: values.og_title || null,
        og_description: values.og_description || null,
        og_image: values.og_image || null,
        twitter_title: values.twitter_title || null,
        twitter_description: values.twitter_description || null,
        twitter_image: values.twitter_image || null,
        schema_type: values.schema_type || 'Article',
        robots_meta: values.robots_meta || 'index,follow',
        breadcrumbs: values.breadcrumbs !== false,
        seo_score: currentAnalysis?.overallScore || null,
        readability_score: currentAnalysis?.readabilityScore || null,
        word_count: currentAnalysis?.wordCount || null,
        internal_links: currentAnalysis?.metrics?.internalLinks || null,
        external_links: currentAnalysis?.metrics?.externalLinks || null,
        images_count: currentAnalysis?.metrics?.images || null,
        alt_texts_missing: currentAnalysis?.metrics?.altTextsMissing || null,
        h1_count: currentAnalysis?.metrics?.h1Count || null,
        h2_count: currentAnalysis?.metrics?.h2Count || null,
        h3_count: currentAnalysis?.metrics?.h3Count || null,
      };
      
      if (editingPost) {
        // Update existing post
        const { data, error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(postData)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: editingPost ? "Post updated!" : "Post created!",
        description: "Your SEO-optimized blog post has been saved successfully.",
      });
      setIsDialogOpen(false);
      setEditingPost(null);
      setCurrentAnalysis(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save post. Please try again.",
        variant: "destructive",
      });
      console.error('Save error:', error);
    },
  });

  // Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting blog post:', id);
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Post deleted!",
        description: "The blog post has been removed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post. Please try again.",
        variant: "destructive",
      });
      console.error('Delete error:', error);
    },
  });

  const onSubmit = (values: BlogPostForm) => {
    // Auto-generate slug from title if empty
    if (!values.slug && values.title) {
      values.slug = values.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    saveMutation.mutate(values);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      category: post.category || "",
      read_time: post.read_time || "",
      image_url: post.image_url || "",
      author: post.author || "",
      featured: post.featured || false,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      focus_keyword: post.focus_keyword || "",
      seo_keywords: post.seo_keywords || [],
      canonical_url: post.canonical_url || "",
      og_title: post.og_title || "",
      og_description: post.og_description || "",
      og_image: post.og_image || "",
      twitter_title: post.twitter_title || "",
      twitter_description: post.twitter_description || "",
      twitter_image: post.twitter_image || "",
      schema_type: post.schema_type || "Article",
      robots_meta: post.robots_meta || "index,follow",
      breadcrumbs: post.breadcrumbs || true,
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingPost(null);
    setCurrentAnalysis(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleScoreUpdate = (seoScore: number, readabilityScore: number, analysis: any) => {
    setCurrentAnalysis({
      overallScore: seoScore,
      readabilityScore: readabilityScore,
      wordCount: analysis.wordCount,
      metrics: analysis.metrics
    });
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-gray-400";
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const existingSlugs = posts?.map(p => p.slug) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">SEO Blog Dashboard</h1>
            <p className="text-lg text-gray-600">Professional content management with enterprise-grade SEO tools</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="w-4 h-4" />
                {posts?.length || 0} posts
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Star className="w-4 h-4" />
                {posts?.filter(p => p.featured).length || 0} featured
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="w-4 h-4" />
                Avg SEO: {posts?.length ? Math.round(posts.reduce((acc, p) => acc + (p.seo_score || 0), 0) / posts.length) : 0}
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNew} size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Create New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  {editingPost ? "Edit SEO-Optimized Post" : "Create New SEO-Optimized Post"}
                  <TrendingUp className="w-6 h-6 text-primary" />
                </DialogTitle>
                <DialogDescription className="text-base">
                  Professional content creation with real-time SEO analysis, social media optimization, and advanced analytics
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="content" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="content" className="gap-2">
                        <FileText className="w-4 h-4" />
                        Content
                      </TabsTrigger>
                      <TabsTrigger value="seo" className="gap-2">
                        <Search className="w-4 h-4" />
                        SEO Settings
                      </TabsTrigger>
                      <TabsTrigger value="analysis" className="gap-2">
                        <BarChart3 className="w-4 h-4" />
                        SEO Analysis
                      </TabsTrigger>
                      <TabsTrigger value="preview" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold">Title</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Write an engaging, keyword-rich title" 
                                    className="text-lg"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold">URL Slug</FormLabel>
                                <FormControl>
                                  <SlugGenerator
                                    title={form.watch("title")}
                                    value={field.value}
                                    onChange={field.onChange}
                                    existingSlugs={existingSlugs}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold">Excerpt</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Write a compelling excerpt that includes your focus keyword..." 
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Technology, Marketing" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="read_time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Read Time</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 5 min read" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                  <Input placeholder="Author name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="featured"
                              {...form.register("featured")}
                              className="h-4 w-4"
                            />
                            <label htmlFor="featured" className="text-sm font-medium flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Featured Post
                            </label>
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="image_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-semibold">Featured Image</FormLabel>
                              <FormControl>
                                <ImageUpload
                                  currentImage={field.value}
                                  onImageUploaded={(url) => field.onChange(url)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">Content</FormLabel>
                            <FormControl>
                              <MarkdownEditor
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="# Your SEO-Optimized Blog Post

Start with an engaging introduction that includes your focus keyword...

## Use H2 headings to structure your content

Write comprehensive, valuable content that answers your readers' questions.

### H3 headings for sub-topics

- Use bullet points for better readability
- Include internal and external links
- Add images with descriptive alt text

![Alt text describing your image](image-url)

**Remember:** Aim for 300+ words, use your focus keyword naturally, and write for humans first, search engines second."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    <TabsContent value="seo">
                      <SEOMetaFields form={form} />
                    </TabsContent>

                    <TabsContent value="analysis">
                      <SEOAnalyzer
                        title={form.watch("title")}
                        content={form.watch("content")}
                        excerpt={form.watch("excerpt")}
                        focusKeyword={form.watch("focus_keyword")}
                        metaTitle={form.watch("meta_title")}
                        metaDescription={form.watch("meta_description")}
                        onScoreUpdate={handleScoreUpdate}
                      />
                    </TabsContent>

                    <TabsContent value="preview">
                      <SEOPreview
                        title={form.watch("title")}
                        excerpt={form.watch("excerpt")}
                        slug={form.watch("slug")}
                        metaTitle={form.watch("meta_title")}
                        metaDescription={form.watch("meta_description")}
                        ogTitle={form.watch("og_title")}
                        ogDescription={form.watch("og_description")}
                        ogImage={form.watch("og_image")}
                        twitterTitle={form.watch("twitter_title")}
                        twitterDescription={form.watch("twitter_description")}
                        twitterImage={form.watch("twitter_image")}
                        imageUrl={form.watch("image_url")}
                      />
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end space-x-3 pt-6 border-t bg-gray-50 -m-6 p-6">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="px-8"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={saveMutation.isPending}
                      className="flex items-center gap-2 px-8"
                    >
                      {saveMutation.isPending ? (
                        "Publishing..."
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4" />
                          {editingPost ? "Update Post" : "Publish Post"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Posts Overview</h2>
            <p className="text-gray-600 mt-1">Manage your SEO-optimized content</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-center">SEO Score</TableHead>
                <TableHead className="text-center">Readability</TableHead>
                <TableHead className="text-center">Words</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      Loading posts...
                    </div>
                  </TableCell>
                </TableRow>
              ) : (!posts || posts.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="space-y-4">
                      <div className="text-6xl">📝</div>
                      <h3 className="text-lg font-medium text-gray-900">No blog posts yet</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Create your first SEO-optimized blog post to get started with professional content management!
                      </p>
                      <Button onClick={handleNew} className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Post
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post: BlogPost) => (
                  <TableRow key={post.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.title}</span>
                          {post.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                          <ExternalLink className="w-3 h-3" />
                          <a 
                            href={`/blog/${post.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary underline"
                          >
                            View Live
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {post.category || 'Uncategorized'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {post.author || 'Anonymous'}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-semibold ${getScoreColor(post.seo_score)}`}>
                        {post.seo_score || '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-semibold ${getScoreColor(post.readability_score)}`}>
                        {post.readability_score || '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-gray-600">
                        {post.word_count || '—'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                        Published
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(post)}
                          className="gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteMutation.mutate(post.id)}
                          disabled={deleteMutation.isPending}
                          className="gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
