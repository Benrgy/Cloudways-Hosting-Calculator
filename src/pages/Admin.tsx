
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
import { ImageUpload } from "@/components/ImageUpload";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

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
}

const Admin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
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
    },
  });

  // Temporary mock data until database is set up
  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      console.log('Admin posts will be loaded from database once tables are created');
      return [];
    },
  });

  // Temporary save mutation until database is set up
  const saveMutation = useMutation({
    mutationFn: async (values: BlogPostForm) => {
      console.log('Post would be saved to database:', values);
      throw new Error('Database not set up yet - please create the blog_posts table first');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: editingPost ? "Post updated!" : "Post created!",
        description: "Your blog post has been saved successfully.",
      });
      setIsDialogOpen(false);
      setEditingPost(null);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save post. Please set up the database first.",
        variant: "destructive",
      });
      console.error('Save error:', error);
    },
  });

  // Temporary delete mutation until database is set up
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Post would be deleted from database:', id);
      throw new Error('Database not set up yet - please create the blog_posts table first');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({
        title: "Post deleted!",
        description: "The blog post has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post. Please set up the database first.",
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

  const handleEdit = (post: any) => {
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
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingPost(null);
    form.reset();
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNew}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? "Edit Post" : "Create New Post"}
                </DialogTitle>
                <DialogDescription>
                  {editingPost ? "Update your blog post" : "Create a new blog post with rich content and images"}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            placeholder="Write your blog post content using Markdown..."
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
                  
                  <div className="flex justify-end space-x-2 pt-4">
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
                    >
                      {saveMutation.isPending 
                        ? "Saving..." 
                        : editingPost ? "Update" : "Create"
                      }
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
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Database Tables Found</h3>
                      <p className="text-gray-600 mb-4">
                        The blog_posts table needs to be created first. 
                        <br />Please set up the database schema to start managing blog posts.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post: any) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
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
