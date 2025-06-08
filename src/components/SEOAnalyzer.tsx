
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, XCircle, Target, Eye, Search, Globe, TrendingUp, Zap } from "lucide-react";

interface SEOAnalyzerProps {
  title: string;
  content: string;
  excerpt: string;
  focusKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
  onScoreUpdate?: (score: number, readabilityScore: number, analysis: any) => void;
}

export const SEOAnalyzer = ({ 
  title, 
  content, 
  excerpt, 
  focusKeyword, 
  metaTitle, 
  metaDescription,
  onScoreUpdate 
}: SEOAnalyzerProps) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (title || content) {
      analyzeContent();
    }
  }, [title, content, excerpt, focusKeyword, metaTitle, metaDescription]);

  const analyzeContent = () => {
    const text = content?.toLowerCase() || '';
    const titleText = title?.toLowerCase() || '';
    const metaTitleText = (metaTitle || title)?.toLowerCase() || '';
    const metaDescText = (metaDescription || excerpt)?.toLowerCase() || '';
    
    // Enhanced word count and readability analysis
    const words = content?.split(/\s+/).filter(word => word.length > 0) || [];
    const wordCount = words.length;
    const sentences = content?.split(/[.!?]+/).filter(s => s.trim().length > 0) || [];
    const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0;
    
    // Advanced heading analysis
    const h1Count = (content?.match(/^# /gm) || []).length;
    const h2Count = (content?.match(/^## /gm) || []).length;
    const h3Count = (content?.match(/^### /gm) || []).length;
    const h4Count = (content?.match(/^#### /gm) || []).length;
    const totalHeadings = h1Count + h2Count + h3Count + h4Count;
    
    // Enhanced links analysis
    const internalLinks = (content?.match(/\[.*?\]\((?!http)/g) || []).length;
    const externalLinks = (content?.match(/\[.*?\]\(http/g) || []).length;
    const totalLinks = internalLinks + externalLinks;
    
    // Enhanced images analysis
    const images = (content?.match(/!\[.*?\]\(/g) || []).length;
    const imagesWithAlt = (content?.match(/!\[.+\]\(/g) || []).length;
    const altTextsMissing = images - imagesWithAlt;
    
    // Advanced focus keyword analysis
    let keywordScore = 0;
    let keywordIssues = [];
    let keywordDensity = 0;
    
    if (focusKeyword && focusKeyword.trim()) {
      const keyword = focusKeyword.toLowerCase().trim();
      const keywordInTitle = titleText.includes(keyword);
      const keywordInMetaTitle = metaTitleText.includes(keyword);
      const keywordInMetaDesc = metaDescText.includes(keyword);
      const keywordInContent = text.includes(keyword);
      const keywordInFirstParagraph = text.substring(0, 300).includes(keyword);
      const keywordMatches = (text.match(new RegExp(keyword, 'g')) || []).length;
      keywordDensity = wordCount > 0 ? (keywordMatches / wordCount) * 100 : 0;
      
      // More sophisticated keyword scoring
      if (keywordInTitle) keywordScore += 25;
      else keywordIssues.push("Focus keyword missing in title");
      
      if (keywordInMetaTitle) keywordScore += 20;
      else keywordIssues.push("Focus keyword missing in meta title");
      
      if (keywordInMetaDesc) keywordScore += 15;
      else keywordIssues.push("Focus keyword missing in meta description");
      
      if (keywordInContent) keywordScore += 15;
      else keywordIssues.push("Focus keyword missing in content");
      
      if (keywordInFirstParagraph) keywordScore += 10;
      else keywordIssues.push("Focus keyword not in first paragraph");
      
      if (keywordDensity >= 0.5 && keywordDensity <= 2.5) keywordScore += 15;
      else if (keywordDensity < 0.5) keywordIssues.push(`Keyword density too low: ${keywordDensity.toFixed(1)}% (target: 0.5-2.5%)`);
      else keywordIssues.push(`Keyword density too high: ${keywordDensity.toFixed(1)}% (target: 0.5-2.5%)`);
    } else {
      keywordIssues.push("No focus keyword set");
    }
    
    // Enhanced technical SEO scoring
    let technicalScore = 0;
    let technicalIssues = [];
    
    // Title optimization
    const titleLength = (metaTitle || title)?.length || 0;
    if (titleLength >= 30 && titleLength <= 60) technicalScore += 15;
    else if (titleLength === 0) technicalIssues.push("Title is missing");
    else if (titleLength < 30) technicalIssues.push(`Title too short: ${titleLength} chars (optimal: 30-60)`);
    else technicalIssues.push(`Title too long: ${titleLength} chars (optimal: 30-60)`);
    
    // Meta description optimization
    const metaDescLength = (metaDescription || excerpt)?.length || 0;
    if (metaDescLength >= 120 && metaDescLength <= 160) technicalScore += 15;
    else if (metaDescLength === 0) technicalIssues.push("Meta description is missing");
    else if (metaDescLength < 120) technicalIssues.push(`Meta description too short: ${metaDescLength} chars (optimal: 120-160)`);
    else technicalIssues.push(`Meta description too long: ${metaDescLength} chars (optimal: 120-160)`);
    
    // Content length scoring
    if (wordCount >= 300 && wordCount <= 2500) technicalScore += 15;
    else if (wordCount < 300) technicalIssues.push(`Content too short: ${wordCount} words (minimum: 300)`);
    else if (wordCount > 2500) technicalScore += 10; // Still good but very long
    
    // Heading structure optimization
    if (h1Count === 1) technicalScore += 10;
    else if (h1Count === 0) technicalIssues.push("Missing H1 heading");
    else technicalIssues.push(`Multiple H1 headings found: ${h1Count} (should be exactly 1)`);
    
    if (h2Count >= 2) technicalScore += 10;
    else if (h2Count === 1) technicalScore += 7;
    else technicalIssues.push("Add H2 headings to improve structure");
    
    // Content structure scoring
    if (totalHeadings >= 3) technicalScore += 5;
    else technicalIssues.push("Add more headings for better content structure");
    
    // Images optimization
    if (images > 0) {
      if (altTextsMissing === 0) technicalScore += 10;
      else technicalIssues.push(`${altTextsMissing} images missing alt text`);
      
      if (images >= 1 && images <= 10) technicalScore += 5;
      else if (images > 10) technicalIssues.push("Consider reducing number of images for better performance");
    }
    
    // Links optimization
    if (internalLinks >= 2) technicalScore += 10;
    else if (internalLinks === 1) technicalScore += 7;
    else technicalIssues.push("Add internal links for better SEO");
    
    if (externalLinks >= 1 && externalLinks <= 5) technicalScore += 5;
    else if (externalLinks === 0) technicalIssues.push("Add 1-2 high-quality external links");
    else if (externalLinks > 5) technicalIssues.push("Too many external links - consider reducing");
    
    // Readability analysis (enhanced Flesch Reading Ease)
    const avgSyllablesPerWord = 1.5; // Approximation
    const fleschScore = Math.max(0, Math.min(100, 
      206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
    ));
    
    // Content quality indicators
    let contentQualityScore = 0;
    let contentIssues = [];
    
    if (avgWordsPerSentence <= 20) contentQualityScore += 20;
    else contentIssues.push("Sentences are too long - aim for under 20 words per sentence");
    
    if (wordCount > 0) {
      const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
      const lexicalDiversity = uniqueWords / wordCount;
      if (lexicalDiversity >= 0.4) contentQualityScore += 15;
      else contentIssues.push("Use more varied vocabulary");
    }
    
    // Overall SEO score calculation
    const maxKeywordScore = focusKeyword ? 100 : 0;
    const maxTechnicalScore = 100;
    const maxContentScore = 35;
    
    const weightedScore = focusKeyword 
      ? (keywordScore * 0.4) + (technicalScore * 0.4) + (contentQualityScore * 0.2)
      : (technicalScore * 0.7) + (contentQualityScore * 0.3);
    
    const overallScore = Math.round(Math.max(0, Math.min(100, weightedScore)));
    
    const analysisResult = {
      overallScore,
      readabilityScore: Math.round(fleschScore),
      wordCount,
      keywordScore,
      technicalScore,
      contentQualityScore,
      keywordIssues,
      technicalIssues,
      contentIssues,
      keywordDensity,
      metrics: {
        h1Count,
        h2Count,
        h3Count,
        h4Count,
        totalHeadings,
        internalLinks,
        externalLinks,
        totalLinks,
        images,
        altTextsMissing,
        titleLength,
        metaDescLength,
        avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
        sentences: sentences.length
      }
    };
    
    setAnalysis(analysisResult);
    
    if (onScoreUpdate) {
      onScoreUpdate(overallScore, Math.round(fleschScore), analysisResult);
    }
  };

  if (!analysis) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Start writing content to see SEO analysis...
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: "default" as const, label: "Excellent", icon: CheckCircle };
    if (score >= 60) return { variant: "secondary" as const, label: "Good", icon: Target };
    return { variant: "destructive" as const, label: "Needs Work", icon: XCircle };
  };

  return (
    <div className="space-y-6">
      {/* Overall Scores Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overall SEO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}
                </span>
                <Badge variant={getScoreBadge(analysis.overallScore).variant}>
                  {getScoreBadge(analysis.overallScore).label}
                </Badge>
              </div>
              <Progress value={analysis.overallScore} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Keyword Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getScoreColor(analysis.keywordScore)}`}>
                  {analysis.keywordScore}
                </span>
                <Badge variant={getScoreBadge(analysis.keywordScore).variant} className="text-xs">
                  {analysis.keywordDensity.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={analysis.keywordScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Search className="w-4 h-4" />
              Technical SEO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getScoreColor(analysis.technicalScore)}`}>
                  {analysis.technicalScore}
                </span>
                <Badge variant={getScoreBadge(analysis.technicalScore).variant} className="text-xs">
                  {analysis.wordCount}w
                </Badge>
              </div>
              <Progress value={analysis.technicalScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Readability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getScoreColor(analysis.readabilityScore)}`}>
                  {analysis.readabilityScore}
                </span>
                <Badge variant={getScoreBadge(analysis.readabilityScore).variant} className="text-xs">
                  {analysis.metrics.avgWordsPerSentence}w/s
                </Badge>
              </div>
              <Progress value={analysis.readabilityScore} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues and Recommendations */}
        <div className="space-y-4">
          {/* Keyword Issues */}
          {analysis.keywordIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Keyword Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.keywordIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Issues */}
          {analysis.technicalIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Technical SEO
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.technicalIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Quality Issues */}
          {analysis.contentIssues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Content Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.contentIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Content Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Content Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Word Count:</span>
                  <span className={analysis.wordCount >= 300 ? "text-green-600" : "text-red-600"}>
                    {analysis.wordCount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sentences:</span>
                  <span>{analysis.metrics.sentences}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Avg Words/Sentence:</span>
                  <span className={analysis.metrics.avgWordsPerSentence <= 20 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.avgWordsPerSentence}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">H1 Tags:</span>
                  <span className={analysis.metrics.h1Count === 1 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.h1Count}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">H2 Tags:</span>
                  <span className={analysis.metrics.h2Count >= 2 ? "text-green-600" : "text-yellow-600"}>
                    {analysis.metrics.h2Count}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">H3 Tags:</span>
                  <span>{analysis.metrics.h3Count}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Internal Links:</span>
                  <span className={analysis.metrics.internalLinks >= 2 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.internalLinks}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">External Links:</span>
                  <span className={analysis.metrics.externalLinks >= 1 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.externalLinks}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Images:</span>
                  <span>{analysis.metrics.images}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Missing Alt Text:</span>
                  <span className={analysis.metrics.altTextsMissing === 0 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.altTextsMissing}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Title Length:</span>
                  <span className={analysis.metrics.titleLength >= 30 && analysis.metrics.titleLength <= 60 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.titleLength}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Meta Description:</span>
                  <span className={analysis.metrics.metaDescLength >= 120 && analysis.metrics.metaDescLength <= 160 ? "text-green-600" : "text-red-600"}>
                    {analysis.metrics.metaDescLength}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
