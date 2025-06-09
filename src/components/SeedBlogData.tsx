
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, AlertCircle } from "lucide-react";
import { seedBlogData } from "@/utils/seedBlogData";
import { useToast } from "@/hooks/use-toast";

export const SeedBlogData = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedingComplete, setSeedingComplete] = useState(false);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setIsSeeding(true);
    
    try {
      const result = await seedBlogData();
      
      if (result.success) {
        setSeedingComplete(true);
        toast({
          title: "Blog Data Added Successfully!",
          description: "All SEO-optimized articles have been added to your blog.",
        });
      } else {
        throw new Error("Seeding failed");
      }
    } catch (error) {
      toast({
        title: "Error Adding Blog Data",
        description: "There was an error adding the blog content. Please try again.",
        variant: "destructive",
      });
      console.error("Seeding error:", error);
    } finally {
      setIsSeeding(false);
    }
  };

  if (seedingComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Blog Content Added Successfully!</h3>
              <p className="text-green-700">
                6 SEO-optimized articles have been added to your blog.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Add SEO Blog Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Ready to add professional blog content?</h3>
          <p className="text-sm text-muted-foreground">
            This will add 6 professionally written, SEO-optimized articles covering migration guides, 
            performance optimization, and cost comparison topics.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Content Overview:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Migration Guides:</strong> 2 comprehensive migration articles</li>
              <li>• <strong>Performance Optimization:</strong> 2 speed & optimization guides</li>
              <li>• <strong>Cost Comparison:</strong> 2 detailed pricing analysis articles</li>
              <li>• <strong>All articles:</strong> 1000+ words, SEO-optimized, human-readable</li>
            </ul>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This will add content to your database. 
              Make sure you have a proper Supabase connection configured.
            </p>
          </div>
        </div>

        <Button 
          onClick={handleSeedData}
          disabled={isSeeding}
          className="w-full"
          size="lg"
        >
          {isSeeding ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding Blog Content...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Add SEO Blog Content
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
