
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, Shield, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedCalculatorResultsProps {
  results: any;
  inputs: any;
}

export const EnhancedCalculatorResults = ({ results, inputs }: EnhancedCalculatorResultsProps) => {
  const { toast } = useToast();

  const handleShareResults = async () => {
    const shareData = {
      title: "My Cloudways Hosting Savings",
      text: `I could save $${results.monthlySavings.toFixed(2)} per month by switching to Cloudways!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const resultText = `Cloudways Savings Calculator Results:
Monthly Savings: $${results.monthlySavings.toFixed(2)}
Annual Savings: $${results.annualSavings.toFixed(2)}
Performance Improvement: ${results.performanceImprovement.loadingSpeed.toFixed(0)}%
Recommended Plan: ${results.recommendedPlan}`;
    
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Results Copied!",
      description: "Your calculation results have been copied to clipboard.",
    });
  };

  const generatePDFReport = () => {
    toast({
      title: "PDF Generation",
      description: "PDF report generation feature coming soon!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          onClick={handleShareResults}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>
        <Button 
          onClick={generatePDFReport}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Savings */}
        <Card className="border-emerald-200 bg-emerald-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-emerald-700 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Monthly Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              ${results.monthlySavings > 0 ? results.monthlySavings.toFixed(2) : '0.00'}
            </div>
            <p className="text-sm text-emerald-600 mt-1">
              {results.savingsPercentage > 0 ? `${results.savingsPercentage.toFixed(1)}% savings` : 'Similar cost'}
            </p>
            {results.monthlySavings > 0 && (
              <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-emerald-200">
                Great savings!
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Annual Savings */}
        <Card className="border-blue-200 bg-blue-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Annual Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              ${results.annualSavings > 0 ? results.annualSavings.toFixed(2) : '0.00'}
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Over 12 months
            </p>
            {results.annualSavings > 100 && (
              <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                Excellent ROI!
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Performance Improvement */}
        <Card className="border-purple-200 bg-purple-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Speed Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {results.performanceImprovement.loadingSpeed.toFixed(0)}%
            </div>
            <p className="text-sm text-purple-600 mt-1">
              Faster loading
            </p>
            <Badge className="mt-2 bg-purple-100 text-purple-800 border-purple-200">
              Boost SEO
            </Badge>
          </CardContent>
        </Card>

        {/* Uptime Improvement */}
        <Card className="border-orange-200 bg-orange-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-700 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {results.performanceImprovement.uptime}%
            </div>
            <p className="text-sm text-orange-600 mt-1">
              Guaranteed uptime
            </p>
            <Badge className="mt-2 bg-orange-100 text-orange-800 border-orange-200">
              Reliable
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison */}
      <Card className="border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Detailed Cost & Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Current Hosting
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Cost</span>
                  <span className="font-semibold text-red-600">${inputs.monthlyHostingCost}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Annual Cost</span>
                  <span className="font-semibold text-red-600">${(inputs.monthlyHostingCost * 12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{inputs.responseTimeMS}ms</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Typical Uptime</span>
                  <span className="font-semibold">98.5%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                Cloudways {results.recommendedPlan}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monthly Cost</span>
                  <span className="font-semibold text-emerald-600">${results.cloudwaysCost}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Annual Cost</span>
                  <span className="font-semibold text-emerald-600">${(results.cloudwaysCost * 12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Expected Response Time</span>
                  <span className="font-semibold text-emerald-600">&lt;300ms</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Guaranteed Uptime</span>
                  <span className="font-semibold text-emerald-600">99.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Migration Benefits */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-3">Key Migration Benefits</h5>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{results.performanceImprovement.loadingSpeed.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Faster Loading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Expert Support</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
