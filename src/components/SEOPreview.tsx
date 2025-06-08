
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Search, Twitter, Share2 } from "lucide-react";

interface SEOPreviewProps {
  title: string;
  excerpt: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  imageUrl?: string;
}

export const SEOPreview = ({
  title,
  excerpt,
  slug,
  metaTitle,
  metaDescription,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  imageUrl
}: SEOPreviewProps) => {
  const finalMetaTitle = metaTitle || title;
  const finalMetaDescription = metaDescription || excerpt;
  const finalOgTitle = ogTitle || finalMetaTitle;
  const finalOgDescription = ogDescription || finalMetaDescription;
  const finalTwitterTitle = twitterTitle || finalMetaTitle;
  const finalTwitterDescription = twitterDescription || finalMetaDescription;
  const finalOgImage = ogImage || imageUrl;
  const finalTwitterImage = twitterImage || imageUrl;

  const siteUrl = window.location.origin;
  const fullUrl = `${siteUrl}/blog/${slug}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          SEO & Social Media Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Search Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Search className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold">Google Search Preview</h3>
          </div>
          <div className="border rounded-lg p-4 bg-white">
            <div className="space-y-1">
              <div className="text-xs text-green-700">{fullUrl}</div>
              <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer line-clamp-1">
                {finalMetaTitle}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {finalMetaDescription}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <Badge variant={finalMetaTitle.length >= 30 && finalMetaTitle.length <= 60 ? "default" : "destructive"}>
              Title: {finalMetaTitle.length}/60
            </Badge>
            <Badge variant={finalMetaDescription.length >= 120 && finalMetaDescription.length <= 160 ? "default" : "destructive"}>
              Description: {finalMetaDescription.length}/160
            </Badge>
          </div>
        </div>

        {/* Facebook/LinkedIn Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold">Facebook/LinkedIn Preview</h3>
          </div>
          <div className="border rounded-lg overflow-hidden bg-white max-w-md">
            {finalOgImage && (
              <div className="aspect-video bg-gray-200">
                <img 
                  src={finalOgImage} 
                  alt="OG Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-3 space-y-1">
              <div className="text-xs text-gray-500 uppercase">{new URL(fullUrl).hostname}</div>
              <div className="font-semibold text-gray-900 line-clamp-2">
                {finalOgTitle}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {finalOgDescription}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <Badge variant={finalOgTitle.length <= 95 ? "default" : "destructive"}>
              Title: {finalOgTitle.length}/95
            </Badge>
            <Badge variant={finalOgDescription.length <= 300 ? "default" : "destructive"}>
              Description: {finalOgDescription.length}/300
            </Badge>
          </div>
        </div>

        {/* Twitter Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Twitter className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold">Twitter Preview</h3>
          </div>
          <div className="border rounded-xl overflow-hidden bg-white max-w-md">
            {finalTwitterImage && (
              <div className="aspect-video bg-gray-200">
                <img 
                  src={finalTwitterImage} 
                  alt="Twitter Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-3 space-y-1">
              <div className="text-xs text-gray-500">{new URL(fullUrl).hostname}</div>
              <div className="font-semibold text-gray-900 line-clamp-2">
                {finalTwitterTitle}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {finalTwitterDescription}
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <Badge variant={finalTwitterTitle.length <= 70 ? "default" : "destructive"}>
              Title: {finalTwitterTitle.length}/70
            </Badge>
            <Badge variant={finalTwitterDescription.length <= 200 ? "default" : "destructive"}>
              Description: {finalTwitterDescription.length}/200
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
