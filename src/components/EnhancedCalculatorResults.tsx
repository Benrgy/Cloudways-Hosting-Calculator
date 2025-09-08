
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Clock, Shield, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shareCalculation } from "@/utils/shareableUrl";
import { trackPDFDownload } from "@/utils/analytics";

interface EnhancedCalculatorResultsProps {
  results: any;
  inputs: any;
}

export const EnhancedCalculatorResults = ({ results, inputs }: EnhancedCalculatorResultsProps) => {
  const { toast } = useToast();

  const handleShareResults = async () => {
    try {
      await shareCalculation(inputs, results);
      toast({
        title: "Results Shared!",
        description: "Your calculation link has been copied or shared.",
      });
    } catch (error) {
      toast({
        title: "Share Failed",
        description: "Could not share results. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generatePDFReport = () => {
    trackPDFDownload();
    toast({
      title: "PDF Generation",
      description: "PDF report generation feature coming soon!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons - Enhanced for Conversion */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
        <Button 
          onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 text-lg relative"
          size="lg"
        >
          Start Saving Today - FREE Trial
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
            NO CC
          </span>
        </Button>
        <div className="flex gap-3">
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
      </div>

      {/* Social Proof Section */}
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Join successful businesses who made the switch:</p>
          <div className="flex justify-center items-center gap-6 text-xs">
            <div className="text-center">
              <div className="font-bold text-emerald-600">Sarah J.</div>
              <div className="text-gray-500">E-commerce</div>
              <div className="text-emerald-600">"Cut costs 40%"</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-emerald-600">Mike C.</div>
              <div className="text-gray-500">Agency</div>
              <div className="text-emerald-600">"3x faster sites"</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-emerald-600">Emma R.</div>
              <div className="text-gray-500">SaaS</div>
              <div className="text-emerald-600">"Zero downtime"</div>
            </div>
          </div>
        </div>
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

          {/* Migration Benefits - Enhanced with CTA */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
            <div className="flex justify-between items-start mb-4">
              <h5 className="font-semibold text-gray-900 mb-3">Why Businesses Choose Cloudways</h5>
              <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                FREE Migration Included
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{results.performanceGains?.loadingSpeed ? results.performanceGains.loadingSpeed.toFixed(0) : results.performanceImprovement.loadingSpeed.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Faster Loading</div>
                <div className="text-xs text-emerald-600 font-medium">Better SEO ranking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99.99%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
                <div className="text-xs text-blue-600 font-medium">Never lose sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Expert Support</div>
                <div className="text-xs text-purple-600 font-medium">Real humans help</div>
              </div>
            </div>
            
            {/* Conversion CTA */}
            <div className="text-center pt-4 border-t border-emerald-200">
              <p className="text-sm text-gray-600 mb-3">Ready to start saving? Migration is 100% free and handled by experts.</p>
              <Button 
                onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2"
              >
                Start FREE 3-Day Trial →
              </Button>
              <p className="text-xs text-gray-500 mt-2">No credit card required • Cancel anytime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
