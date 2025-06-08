
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Image, Video, File, Edit, Trash2, Copy, Eye, AlertTriangle } from "lucide-react";

interface Media {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  width?: number;
  height?: number;
  alt_text?: string;
  title?: string;
  caption?: string;
  description?: string;
  focus_keyword?: string;
  seo_filename?: string;
}

interface MediaManagerProps {
  onImageSelect?: (url: string, alt?: string) => void;
  showSelector?: boolean;
}

export const MediaManager = ({ onImageSelect, showSelector }: MediaManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      alt_text: "",
      title: "",
      caption: "",
      description: "",
      focus_keyword: "",
      seo_filename: "",
    },
  });

  // Fetch media
  const { data: media = [] } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Media[];
    },
  });

  // Upload media
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // Generate SEO-friendly filename
      const fileExt = file.name.split('.').pop();
      const seoFilename = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      // Upload to Supabase Storage (you'll need to set up storage bucket)
      const filePath = `media/${Date.now()}-${seoFilename}`;
      
      // For now, we'll simulate upload - you'll need to implement actual storage
      const mediaData = {
        filename: seoFilename,
        original_filename: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
        width: null,
        height: null,
      };

      const { data, error } = await supabase
        .from('media')
        .insert(mediaData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({
        title: "Media uploaded!",
        description: "The file has been uploaded successfully.",
      });
      setSelectedFiles(null);
    },
    onError: (error: any) => {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      });
    },
  });

  // Update media
  const updateMutation = useMutation({
    mutationFn: async (values: any) => {
      if (!editingMedia) return;

      const { data, error } = await supabase
        .from('media')
        .update(values)
        .eq('id', editingMedia.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({
        title: "Media updated!",
        description: "The media information has been updated.",
      });
      setIsDialogOpen(false);
      setEditingMedia(null);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update media.",
        variant: "destructive",
      });
    },
  });

  // Delete media
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast({
        title: "Media deleted!",
        description: "The media file has been removed.",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      Array.from(files).forEach(file => {
        uploadMutation.mutate(file);
      });
    }
  };

  const handleEdit = (mediaItem: Media) => {
    setEditingMedia(mediaItem);
    form.reset({
      alt_text: mediaItem.alt_text || "",
      title: mediaItem.title || "",
      caption: mediaItem.caption || "",
      description: mediaItem.description || "",
      focus_keyword: mediaItem.focus_keyword || "",
      seo_filename: mediaItem.seo_filename || "",
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (values: any) => {
    updateMutation.mutate(values);
  };

  const copyUrl = (filePath: string) => {
    // In a real implementation, this would be the actual URL
    const url = `/storage/${filePath}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied!",
      description: "The media URL has been copied to clipboard.",
    });
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (mimeType.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getSEOScore = (mediaItem: Media) => {
    let score = 0;
    if (mediaItem.alt_text) score += 30;
    if (mediaItem.title) score += 20;
    if (mediaItem.description) score += 20;
    if (mediaItem.focus_keyword) score += 15;
    if (mediaItem.seo_filename) score += 15;
    return score;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            SEO Media Library
          </div>
          <div className="space-x-2">
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
            />
            <label htmlFor="media-upload">
              <Button asChild size="sm" className="gap-2">
                <span>
                  <Upload className="w-4 h-4" />
                  Upload Media
                </span>
              </Button>
            </label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item) => {
            const seoScore = getSEOScore(item);
            return (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFileIcon(item.mime_type)}
                    <span className="font-medium text-sm truncate">{item.filename}</span>
                  </div>
                  <div className="flex gap-1">
                    {showSelector && onImageSelect && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onImageSelect(item.file_path, item.alt_text)}
                      >
                        Select
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyUrl(item.file_path)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500"
                      onClick={() => deleteMutation.mutate(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {item.mime_type.startsWith('image/') && (
                  <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image Preview</span>
                  </div>
                )}

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{formatFileSize(item.file_size)}</span>
                  </div>
                  {item.width && item.height && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span>{item.width}x{item.height}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">SEO Score:</span>
                    <Badge variant={seoScore >= 80 ? "default" : seoScore >= 60 ? "secondary" : "destructive"}>
                      {seoScore}%
                    </Badge>
                  </div>
                  {!item.alt_text && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Missing alt text</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>SEO Media Optimization</DialogTitle>
            </DialogHeader>
            
            {editingMedia && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Optimizing: <strong>{editingMedia.filename}</strong>
                  </div>

                  <FormField
                    control={form.control}
                    name="alt_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text (SEO Critical)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Descriptive alt text for accessibility and SEO"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Essential for SEO and accessibility. Describe what's in the image.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="SEO-friendly title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Caption text that appears with the image" {...field} />
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
                            placeholder="Detailed description for SEO and context"
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
                          <Input placeholder="Primary keyword for this image" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo_filename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SEO Filename</FormLabel>
                        <FormControl>
                          <Input placeholder="seo-friendly-filename" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Use hyphens, include keywords, keep it descriptive.
                        </p>
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
                    <Button type="submit" disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? "Saving..." : "Save SEO Data"}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
