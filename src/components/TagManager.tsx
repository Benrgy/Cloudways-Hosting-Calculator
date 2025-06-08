
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SlugGenerator } from "./SlugGenerator";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Tag, Hash, X } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  focus_keyword?: string;
  color: string;
  post_count: number;
}

interface TagManagerProps {
  selectedTags: string[];
  onTagsChange: (tagIds: string[]) => void;
}

export const TagManager = ({ selectedTags, onTagsChange }: TagManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      meta_title: "",
      meta_description: "",
      focus_keyword: "",
      color: "#059669",
    },
  });

  // Fetch tags
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Tag[];
    },
  });

  // Create/update tag
  const saveMutation = useMutation({
    mutationFn: async (values: any) => {
      if (editingTag) {
        const { data, error } = await supabase
          .from('tags')
          .update(values)
          .eq('id', editingTag.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('tags')
          .insert(values)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast({
        title: editingTag ? "Tag updated!" : "Tag created!",
        description: "The tag has been saved successfully.",
      });
      setIsDialogOpen(false);
      setEditingTag(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save tag.",
        variant: "destructive",
      });
    },
  });

  // Delete tag
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
      toast({
        title: "Tag deleted!",
        description: "The tag has been removed.",
      });
    },
  });

  const onSubmit = (values: any) => {
    if (!values.slug && values.name) {
      values.slug = values.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    saveMutation.mutate(values);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    form.reset({
      name: tag.name,
      slug: tag.slug,
      description: tag.description || "",
      meta_title: tag.meta_title || "",
      meta_description: tag.meta_description || "",
      focus_keyword: tag.focus_keyword || "",
      color: tag.color,
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingTag(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      onTagsChange(selectedTags.filter(id => id !== tagId));
    } else {
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const existingSlugs = tags.map(t => t.slug);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Tag Management
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNew} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingTag ? "Edit Tag" : "Create New Tag"}
                </DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tag Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Technology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input type="color" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <SlugGenerator
                            title={form.watch("name")}
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tag description for SEO and user understanding"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO-optimized title for this tag page" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meta_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Meta Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="SEO-optimized description for this tag page"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="focus_keyword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Focus Keyword</FormLabel>
                        <FormControl>
                          <Input placeholder="Main keyword for this tag" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saveMutation.isPending}>
                      {saveMutation.isPending ? "Saving..." : (editingTag ? "Update" : "Create")}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-1">
                <Badge
                  variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  style={{ backgroundColor: selectedTags.includes(tag.id) ? tag.color : undefined }}
                  onClick={() => toggleTag(tag.id)}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.name}
                  {tag.post_count > 0 && (
                    <span className="ml-1 text-xs">({tag.post_count})</span>
                  )}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => handleEdit(tag)}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  onClick={() => deleteMutation.mutate(tag.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          
          {selectedTags.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Selected Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tagId) => {
                  const tag = tags.find(t => t.id === tagId);
                  if (!tag) return null;
                  return (
                    <Badge key={tagId} style={{ backgroundColor: tag.color }}>
                      {tag.name}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => toggleTag(tagId)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
