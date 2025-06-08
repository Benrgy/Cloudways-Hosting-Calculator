
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Check, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SlugGeneratorProps {
  title: string;
  value: string;
  onChange: (slug: string) => void;
  existingSlugs?: string[];
}

export const SlugGenerator = ({ title, value, onChange, existingSlugs = [] }: SlugGeneratorProps) => {
  const [isValid, setIsValid] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const validateSlug = (slug: string) => {
    const isValidFormat = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
    const isUnique = !existingSlugs.includes(slug);
    const isNotEmpty = slug.length > 0;
    const isReasonableLength = slug.length >= 3 && slug.length <= 100;
    
    return isValidFormat && isUnique && isNotEmpty && isReasonableLength;
  };

  const generateSuggestions = (baseSlug: string) => {
    const suggestions = [];
    if (baseSlug) {
      // Add date suffix
      const today = new Date().toISOString().split('T')[0];
      suggestions.push(`${baseSlug}-${today}`);
      
      // Add year suffix
      const year = new Date().getFullYear();
      suggestions.push(`${baseSlug}-${year}`);
      
      // Add guide suffix
      suggestions.push(`${baseSlug}-guide`);
      
      // Add tips suffix
      suggestions.push(`${baseSlug}-tips`);
      
      // Add how-to prefix
      if (!baseSlug.startsWith('how-to-')) {
        suggestions.push(`how-to-${baseSlug}`);
      }
    }
    
    return suggestions.filter(s => !existingSlugs.includes(s)).slice(0, 3);
  };

  useEffect(() => {
    if (value) {
      setIsValid(validateSlug(value));
      const baseSlug = generateSlug(value);
      setSuggestions(generateSuggestions(baseSlug));
    }
  }, [value, existingSlugs]);

  const handleAutoGenerate = () => {
    if (title) {
      const newSlug = generateSlug(title);
      onChange(newSlug);
    }
  };

  const getSlugStatus = () => {
    if (!value) return { color: "text-gray-500", message: "Enter a URL slug" };
    if (!isValid) {
      if (existingSlugs.includes(value)) {
        return { color: "text-red-500", message: "Slug already exists" };
      }
      return { color: "text-red-500", message: "Invalid slug format" };
    }
    return { color: "text-green-500", message: "Valid slug" };
  };

  const status = getSlugStatus();

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="your-blog-post-url"
            className={`pr-8 ${!isValid && value ? 'border-red-500' : ''}`}
          />
          <div className="absolute right-2 top-2.5">
            {value && (isValid ? 
              <Check className="w-4 h-4 text-green-500" /> : 
              <X className="w-4 h-4 text-red-500" />
            )}
          </div>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={handleAutoGenerate}
          disabled={!title}
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className={status.color}>{status.message}</span>
        <span className="text-muted-foreground">
          {value.length}/100 characters
        </span>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Suggestions:</span>
          <div className="flex flex-wrap gap-1">
            {suggestions.map((suggestion) => (
              <Badge 
                key={suggestion}
                variant="outline" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                onClick={() => onChange(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <strong>SEO Tips:</strong> Use keywords, keep it short (3-5 words), avoid stop words like "a", "the", "and"
      </div>
    </div>
  );
};
