
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, XCircle, Target, Eye, Search, Globe } from "lucide-react";

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
    analyzeContent();
  }, [title, content, excerpt, focusKeyword, metaTitle, metaDescription]);

  const analyzeContent = () => {
    const text = content.toLowerCase();
    const titleText = title.toLowerCase();
    const metaTitleText = (metaTitle || title).toLowerCase();
    const metaDescText = (metaDescription || excerpt).toLowerCase();
    
    // Word count and readability
    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgWordsPerSentence = sentences > 0 ? wordCount / sentences : 0;
    
    // Headings analysis
    const h1Count = (content.match(/^# /gm) || []).length;
    const h2Count = (content.match(/^## /gm) || []).length;
    const h3Count = (content.match(/^### /gm) || []).length;
    
    // Links analysis
    const internalLinks = (content.match(/\[.*?\]\((?!http)/g) || []).length;
    const externalLinks = (content.match(/\[.*?\]\(http/g) || []).length;
    
    // Images analysis
    const images = (content.match(/!\[.*?\]\(/g) || []).length;
    const imagesWithAlt = (content.match(/!\[.+\]\(/g) || []).length;
    const altTextsMissing = images - imagesWithAlt;
    
    // Focus keyword analysis
    let keywordScore = 0;
    let keywordIssues = [];
    
    if (focusKeyword) {
      const keyword = focusKeyword.toLowerCase();
      const keywordInTitle = titleText.includes(keyword);
      const keywordInMetaTitle = metaTitleText.includes(keyword);
      const keywordInMetaDesc = metaDescText.includes(keyword);
      const keywordInContent = text.includes(keyword);
      const keywordDensity = (text.match(new RegExp(keyword, 'g')) || []).length / wordCount * 100;
      
      if (keywordInTitle) keywordScore += 25;
      else keywordIssues.push("Focus keyword not in title");
      
      if (keywordInMetaTitle) keywordScore += 20;
      else keywordIssues.push("Focus keyword not in meta title");
      
      if (keywordInMetaDesc) keywordScore += 15;
      else keywordIssues.push("Focus keyword not in meta description");
      
      if (keywordInContent) keywordScore += 20;
      else keywordIssues.push("Focus keyword not in content");
      
      if (keywordDensity >= 0.5 && keywordDensity <= 2.5) keywordScore += 20;
      else keywordIssues.push(`Keyword density ${keywordDensity.toFixed(1)}% (ideal: 0.5-2.5%)`);
    }
    
    // Technical SEO checks
    let technicalScore = 0;
    let technicalIssues = [];
    
    // Title length check
    const titleLength = (metaTitle || title).length;
    if (titleLength >= 30 && titleLength <= 60) technicalScore += 20;
    else technicalIssues.push(`Title length: ${titleLength} chars (ideal: 30-60)`);
    
    // Meta description length
    const metaDescLength = (metaDescription || excerpt).length;
    if (metaDescLength >= 120 && metaDescLength <= 160) technicalScore += 20;
    else technicalIssues.push(`Meta description: ${metaDescLength} chars (ideal: 120-160)`);
    
    // Content length
    if (wordCount >= 300) technicalScore += 15;
    else technicalIssues.push(`Content too short: ${wordCount} words (min: 300)`);
    
    // Headings structure
    if (h1Count === 1) technicalScore += 15;
    else technicalIssues.push(`H1 count: ${h1Count} (should be exactly 1)`);
    
    if (h2Count >= 1) technicalScore += 10;
    else technicalIssues.push("No H2 headings found");
    
    // Images with alt text
    if (images > 0 && altTextsMissing === 0) technicalScore += 10;
    else if (images > 0) technicalIssues.push(`${altTextsMissing} images missing alt text`);
    
    // Links
    if (internalLinks >= 2) technicalScore += 5;
    else technicalIssues.push("Add more internal links (min: 2)");
    
    if (externalLinks >= 1) technicalScore += 5;
    else technicalIssues.push("Add external links for authority");
    
    // Readability score (simplified Flesch formula)
    const avgSyllablesPerWord = 1.5; // Approximation
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    const readabilityScore = Math.max(0, Math.min(100, fleschScore));
    
    // Overall SEO score
    const overallScore = Math.round((keywordScore + technicalScore) / 2);
    
    const analysisResult = {
      overallScore,
      readabilityScore: Math.round(readabilityScore),
      wordCount,
      keywordScore,
      technicalScore,
      keywordIssues,
      technicalIssues,
      metrics: {
        h1Count,
        h2Count,
        h3Count,
        internalLinks,
        externalLinks,
        images,
        altTextsMissing,
        titleLength,
        metaDescLength,
        keywordDensity: focusKeyword ? (text.match(new RegExp(focusKeyword.toLowerCase(), 'g')) || []).length / wordCount * 100 : 0
      }
    };
    
    setAnalysis(analysisResult);
    
    if (onScoreUpdate) {
      onScoreUpdate(overallScore, Math.round(readabilityScore), analysisResult);
    }
  };

  if (!analysis) return null;

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
      {/* Overall Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Search className="w-4 h-4" />
              SEO Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}/100
                </span>
                <Badge variant={getScoreBadge(analysis.overallScore).variant}>
                  {getScoreBadge(analysis.overallScore).label}
                </Badge>
              </div>
              <Progress value={analysis.overallScore} className="h-2" />
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
                  {analysis.readabilityScore}/100
                </span>
                <Badge variant={getScoreBadge(analysis.readabilityScore).variant}>
                  {getScoreBadge(analysis.readabilityScore).label}
                </Badge>
              </div>
              <Progress value={analysis.readabilityScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Word Count
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <span className="text-2xl font-bold">{analysis.wordCount}</span>
              <p className="text-sm text-muted-foreground">
                {analysis.wordCount >= 300 ? "Good length" : "Too short"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keyword Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Keyword Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Score</span>
                <span className={`font-bold ${getScoreColor(analysis.keywordScore)}`}>
                  {analysis.keywordScore}/100
                </span>
              </div>
              {analysis.keywordIssues.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-red-600">Issues to Fix:</h4>
                  {analysis.keywordIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Technical Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technical SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Score</span>
                <span className={`font-bold ${getScoreColor(analysis.technicalScore)}`}>
                  {analysis.technicalScore}/100
                </span>
              </div>
              {analysis.technicalIssues.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-red-600">Issues to Fix:</h4>
                  {analysis.technicalIssues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">H1 Tags:</span>
              <span className={analysis.metrics.h1Count === 1 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.h1Count}
              </span>
            </div>
            <div>
              <span className="font-medium">H2 Tags:</span>
              <span className={analysis.metrics.h2Count >= 1 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.h2Count}
              </span>
            </div>
            <div>
              <span className="font-medium">Internal Links:</span>
              <span className={analysis.metrics.internalLinks >= 2 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.internalLinks}
              </span>
            </div>
            <div>
              <span className="font-medium">External Links:</span>
              <span className={analysis.metrics.externalLinks >= 1 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.externalLinks}
              </span>
            </div>
            <div>
              <span className="font-medium">Images:</span>
              <span className="ml-2">{analysis.metrics.images}</span>
            </div>
            <div>
              <span className="font-medium">Missing Alt:</span>
              <span className={analysis.metrics.altTextsMissing === 0 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.altTextsMissing}
              </span>
            </div>
            <div>
              <span className="font-medium">Title Length:</span>
              <span className={analysis.metrics.titleLength >= 30 && analysis.metrics.titleLength <= 60 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.titleLength}
              </span>
            </div>
            <div>
              <span className="font-medium">Meta Desc:</span>
              <span className={analysis.metrics.metaDescLength >= 120 && analysis.metrics.metaDescLength <= 160 ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
                {analysis.metrics.metaDescLength}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
