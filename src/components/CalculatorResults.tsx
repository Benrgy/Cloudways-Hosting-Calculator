
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock, Shield } from "lucide-react";

interface CalculatorResultsProps {
  results: any;
  inputs: any;
}

export const CalculatorResults = ({ results, inputs }: CalculatorResultsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Monthly Savings */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-emerald-700 flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Monthly Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600">
            ${results.monthlySavings > 0 ? results.monthlySavings.toFixed(2) : '0.00'}
          </div>
          <p className="text-sm text-emerald-600 mt-1">
            {results.savingsPercentage > 0 ? `${results.savingsPercentage.toFixed(1)}% savings` : 'Similar cost'}
          </p>
        </CardContent>
      </Card>

      {/* Annual Savings */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Annual Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            ${results.annualSavings > 0 ? results.annualSavings.toFixed(2) : '0.00'}
          </div>
          <p className="text-sm text-blue-600 mt-1">
            Over 12 months
          </p>
        </CardContent>
      </Card>

      {/* Performance Improvement */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Speed Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {results.performanceImprovement.loadingSpeed.toFixed(0)}%
          </div>
          <p className="text-sm text-purple-600 mt-1">
            Faster loading
          </p>
        </CardContent>
      </Card>

      {/* Uptime Improvement */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-orange-700 flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Uptime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {results.performanceImprovement.uptime}%
          </div>
          <p className="text-sm text-orange-600 mt-1">
            Guaranteed uptime
          </p>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <Card className="md:col-span-2 lg:col-span-4 border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Current Shared Hosting</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Cost</span>
                  <span className="font-semibold">${inputs.monthlyHostingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Cost</span>
                  <span className="font-semibold">${(inputs.monthlyHostingCost * 12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Response Time</span>
                  <span className="font-semibold">{inputs.responseTimeMS}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Typical Uptime</span>
                  <span className="font-semibold">98.5%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Cloudways {results.recommendedPlan}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Cost</span>
                  <span className="font-semibold text-emerald-600">${results.cloudwaysCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Cost</span>
                  <span className="font-semibold text-emerald-600">${(results.cloudwaysCost * 12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Response Time</span>
                  <span className="font-semibold text-emerald-600">&lt;300ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guaranteed Uptime</span>
                  <span className="font-semibold text-emerald-600">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
