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
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, BarChart3, TrendingUp } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Blog Admin</h1>
            <p className="text-gray-600 mt-2">Create SEO-optimized content with real-time analysis</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNew} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                New SEO Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {editingPost ? "Edit SEO Post" : "Create New SEO Post"}
                  <BarChart3 className="w-5 h-5" />
                </DialogTitle>
                <DialogDescription>
                  Create SEO-optimized content with real-time analysis and social media previews
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="content" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="seo">SEO Settings</TabsTrigger>
                      <TabsTrigger value="analysis">SEO Analysis</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Post title" {...field} />
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
                                <FormLabel>Slug (URL path)</FormLabel>
                                <FormControl>
                                  <Input placeholder="post-url-slug" {...field} />
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
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Brief description..." {...field} />
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
                                    <Input placeholder="Migration" {...field} />
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
                                    <Input placeholder="5 min read" {...field} />
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
                            <label htmlFor="featured" className="text-sm font-medium">
                              Featured Post
                            </label>
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="image_url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Featured Image</FormLabel>
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
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <MarkdownEditor
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Write your SEO-optimized blog post content using Markdown..."
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
                  
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      disabled={saveMutation.isPending}
                      className="flex items-center gap-2"
                    >
                      {saveMutation.isPending ? (
                        "Saving..."
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4" />
                          {editingPost ? "Update SEO Post" : "Create SEO Post"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>SEO Score</TableHead>
                <TableHead>Readability</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading posts...
                  </TableCell>
                </TableRow>
              ) : (!posts || posts.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <div className="py-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                      <p className="text-gray-600 mb-4">
                        Create your first blog post to get started!
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post: BlogPost) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        SEO Score: {post.seo_score}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        Readability: {post.readability_score}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        Words: {post.word_count}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        Published
                      </span>
                    </TableCell>
                    <TableCell>
                      {post.featured && (
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                          Featured
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteMutation.mutate(post.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
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
