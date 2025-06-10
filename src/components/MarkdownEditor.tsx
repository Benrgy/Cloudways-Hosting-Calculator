
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const MarkdownEditor = ({ value, onChange, placeholder }: MarkdownEditorProps) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const formatMarkdown = (text: string) => {
    // Handle undefined or null text
    if (!text) return '';
    
    // Simple markdown to HTML conversion for preview
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />')
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n/gim, '<br>');
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `${before}**${selected || 'bold text'}**${after}`;
        break;
      case 'italic':
        newText = `${before}*${selected || 'italic text'}*${after}`;
        break;
      case 'heading':
        newText = `${before}## ${selected || 'Heading'}${after}`;
        break;
      case 'link':
        newText = `${before}[${selected || 'link text'}](url)${after}`;
        break;
      case 'image':
        newText = `${before}![${selected || 'alt text'}](image-url)${after}`;
        break;
      default:
        return;
    }

    onChange(newText);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('bold')}
        >
          Bold
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('italic')}
        >
          Italic
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('heading')}
        >
          Heading
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('link')}
        >
          Link
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => insertMarkdown('image')}
        >
          Image
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "edit" | "preview")}>
        <TabsList>
          <TabsTrigger value="edit">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Write your content in Markdown..."}
            className="min-h-[400px] font-mono"
          />
        </TabsContent>

        <TabsContent value="preview">
          <div
            className="min-h-[400px] p-4 border rounded-md prose max-w-none"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(value) }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
