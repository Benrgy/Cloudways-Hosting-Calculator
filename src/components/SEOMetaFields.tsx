
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, Twitter, Share2, Search, Target } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface SEOMetaFieldsProps {
  form: UseFormReturn<any>;
}

export const SEOMetaFields = ({ form }: SEOMetaFieldsProps) => {
  const watchedTitle = form.watch("title");
  const watchedMetaTitle = form.watch("meta_title");
  const watchedExcerpt = form.watch("excerpt");
  const watchedMetaDescription = form.watch("meta_description");

  const getCharacterCount = (text: string, max: number) => {
    const count = text?.length || 0;
    const color = count > max ? "text-red-500" : count > max * 0.9 ? "text-yellow-500" : "text-green-500";
    return { count, color };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          SEO & Social Media Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic SEO</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <FormField
              control={form.control}
              name="focus_keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Focus Keyword
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your main keyword for this post" {...field} />
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
                  <FormLabel>
                    Meta Title 
                    <Badge variant="outline" className="ml-2">
                      <span className={getCharacterCount(field.value, 60).color}>
                        {getCharacterCount(field.value, 60).count}/60
                      </span>
                    </Badge>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={watchedTitle || "SEO title for search engines"} 
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use the post title. Optimal length: 30-60 characters.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Meta Description
                    <Badge variant="outline" className="ml-2">
                      <span className={getCharacterCount(field.value, 160).color}>
                        {getCharacterCount(field.value, 160).count}/160
                      </span>
                    </Badge>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={watchedExcerpt || "Description that appears in search results"}
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Leave empty to use the excerpt. Optimal length: 120-160 characters.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="canonical_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/canonical-url" {...field} />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Set if this content exists elsewhere or to prevent duplicate content issues.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="robots_meta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Robots Meta</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || "index,follow"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select robots directive" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="index,follow">Index, Follow (Default)</SelectItem>
                      <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                      <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                      <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            {/* Open Graph */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Open Graph (Facebook, LinkedIn)
              </h3>
              
              <FormField
                control={form.control}
                name="og_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      OG Title
                      <Badge variant="outline" className="ml-2">
                        <span className={getCharacterCount(field.value, 95).color}>
                          {getCharacterCount(field.value, 95).count}/95
                        </span>
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={watchedMetaTitle || watchedTitle || "Open Graph title"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="og_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      OG Description
                      <Badge variant="outline" className="ml-2">
                        <span className={getCharacterCount(field.value, 300).color}>
                          {getCharacterCount(field.value, 300).count}/300
                        </span>
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={watchedMetaDescription || watchedExcerpt || "Open Graph description"}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="og_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/og-image.jpg" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1200x630px. Leave empty to use featured image.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Twitter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Twitter className="w-5 h-5" />
                Twitter Card
              </h3>
              
              <FormField
                control={form.control}
                name="twitter_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Twitter Title
                      <Badge variant="outline" className="ml-2">
                        <span className={getCharacterCount(field.value, 70).color}>
                          {getCharacterCount(field.value, 70).count}/70
                        </span>
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={watchedMetaTitle || watchedTitle || "Twitter title"} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Twitter Description
                      <Badge variant="outline" className="ml-2">
                        <span className={getCharacterCount(field.value, 200).color}>
                          {getCharacterCount(field.value, 200).count}/200
                        </span>
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={watchedMetaDescription || watchedExcerpt || "Twitter description"}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/twitter-image.jpg" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 1200x675px. Leave empty to use featured image.
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <FormField
              control={form.control}
              name="seo_keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Keywords</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="keyword1, keyword2, keyword3"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value || ''}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Separate keywords with commas. These support your focus keyword.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="breadcrumbs"
                {...form.register("breadcrumbs")}
                className="h-4 w-4"
              />
              <label htmlFor="breadcrumbs" className="text-sm font-medium">
                Enable Breadcrumbs
              </label>
            </div>
          </TabsContent>

          <TabsContent value="schema" className="space-y-4">
            <FormField
              control={form.control}
              name="schema_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schema Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || "Article"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schema type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="BlogPosting">Blog Posting</SelectItem>
                      <SelectItem value="NewsArticle">News Article</SelectItem>
                      <SelectItem value="TechArticle">Technical Article</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="HowTo">How-To Guide</SelectItem>
                      <SelectItem value="FAQ">FAQ</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose the most appropriate schema type for better search engine understanding.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
