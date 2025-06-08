
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Code, FileText, AlertTriangle } from "lucide-react";

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const HtmlEditor = ({ value, onChange, placeholder }: HtmlEditorProps) => {
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview' | 'split'>('edit');

  const insertHtmlTag = (tag: string, hasClosing: boolean = true) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let insertion = '';
    if (hasClosing) {
      insertion = `<${tag}>${selectedText}</${tag}>`;
    } else {
      insertion = `<${tag}>`;
    }
    
    const newValue = value.substring(0, start) + insertion + value.substring(end);
    onChange(newValue);
    
    // Set cursor position after insertion
    setTimeout(() => {
      if (hasClosing && selectedText === '') {
        textarea.selectionStart = textarea.selectionEnd = start + tag.length + 2;
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
      }
      textarea.focus();
    }, 0);
  };

  const htmlButtons = [
    { label: 'H1', tag: 'h1' },
    { label: 'H2', tag: 'h2' },
    { label: 'H3', tag: 'h3' },
    { label: 'H4', tag: 'h4' },
    { label: 'P', tag: 'p' },
    { label: 'Bold', tag: 'strong' },
    { label: 'Italic', tag: 'em' },
    { label: 'Link', tag: 'a href=""' },
    { label: 'Img', tag: 'img src="" alt=""', hasClosing: false },
    { label: 'UL', tag: 'ul' },
    { label: 'OL', tag: 'ol' },
    { label: 'LI', tag: 'li' },
    { label: 'Div', tag: 'div' },
    { label: 'Span', tag: 'span' },
    { label: 'BR', tag: 'br', hasClosing: false },
  ];

  const cleanHtml = (html: string) => {
    // Basic HTML sanitization for preview
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          HTML Content Editor
        </CardTitle>
        <div className="flex gap-2 flex-wrap">
          {htmlButtons.map((button) => (
            <Button
              key={button.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertHtmlTag(button.tag, button.hasClosing !== false)}
              className="text-xs"
            >
              {button.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={previewMode} onValueChange={(value) => setPreviewMode(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="edit" className="gap-2">
              <FileText className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="split" className="gap-2">
              <Code className="w-4 h-4" />
              Split
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="mt-4">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || "Enter your HTML content here..."}
              className="min-h-[400px] font-mono text-sm"
            />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg p-4 min-h-[400px] bg-white">
              <div className="flex items-center gap-2 mb-4 text-sm text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                Preview Mode - HTML content is rendered for preview only
              </div>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanHtml(value) }}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="split" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">HTML Code</h4>
                <Textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder || "Enter your HTML content here..."}
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">Live Preview</h4>
                <div className="border rounded-lg p-4 min-h-[400px] bg-white overflow-auto">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: cleanHtml(value) }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <strong>SEO Tips:</strong> Use semantic HTML tags (h1, h2, h3), include alt attributes for images, 
          use descriptive link text, and structure your content hierarchically for better search engine optimization.
        </div>
      </CardContent>
    </Card>
  );
};
