
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHostingProviders } from '@/hooks/useHostingProviders';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator as CalculatorIcon, DollarSign, TrendingDown } from 'lucide-react';

export const Calculator = () => {
  const { t } = useLanguage();
  const { providers, isLoading, error } = useHostingProviders();
  const [currentCost, setCurrentCost] = useState('');
  const [traffic, setTraffic] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [results, setResults] = useState<{
    monthlySavings: number;
    yearlyValue: number;
    performanceGain: number;
  } | null>(null);

  const calculateSavings = () => {
    const current = parseFloat(currentCost) || 0;
    const cloudwaysEstimate = current * 0.6; // Assume 40% savings
    const monthlySavings = current - cloudwaysEstimate;
    const yearlyValue = monthlySavings * 12;
    const performanceGain = 65; // Average performance improvement

    setResults({
      monthlySavings,
      yearlyValue,
      performanceGain
    });
  };

  if (error) {
    return (
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Calculator Temporarily Unavailable</h3>
              <p className="text-red-600">We're working to restore the calculator. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cloudways Hosting Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your potential savings by switching to Cloudways hosting
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalculatorIcon className="w-5 h-5 mr-2 text-emerald-600" />
                  Current Hosting Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="current-cost">Monthly Hosting Cost ($)</Label>
                  <Input
                    id="current-cost"
                    type="number"
                    placeholder="e.g., 25"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="traffic">Monthly Visitors</Label>
                  <Select value={traffic} onValueChange={setTraffic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your monthly traffic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Under 10K visitors</SelectItem>
                      <SelectItem value="medium">10K - 100K visitors</SelectItem>
                      <SelectItem value="high">100K - 500K visitors</SelectItem>
                      <SelectItem value="enterprise">500K+ visitors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="plan">Recommended Cloudways Plan</Label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan} disabled={isLoading}>
                    <SelectTrigger>
                      <SelectValue placeholder={isLoading ? "Loading plans..." : "Select a plan"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="do-1gb">DigitalOcean - 1GB ($12/mo)</SelectItem>
                      <SelectItem value="do-2gb">DigitalOcean - 2GB ($24/mo)</SelectItem>
                      <SelectItem value="linode-1gb">Linode - 1GB ($12/mo)</SelectItem>
                      <SelectItem value="vultr-1gb">Vultr - 1GB ($13/mo)</SelectItem>
                      <SelectItem value="aws-t3-micro">AWS - t3.micro ($36/mo)</SelectItem>
                      <SelectItem value="gcp-n1-standard-1">Google Cloud - n1-standard-1 ($42/mo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateSavings}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={!currentCost || !traffic}
                >
                  Calculate My Savings
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2 text-emerald-600" />
                  Your Potential Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-emerald-50 rounded-lg">
                      <DollarSign className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-emerald-600">
                        ${results.monthlySavings.toFixed(0)}/mo
                      </div>
                      <div className="text-gray-600">Monthly Savings</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          ${results.yearlyValue.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">Yearly Value</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.performanceGain}%
                        </div>
                        <div className="text-sm text-gray-600">Faster Loading</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-gray-600 mb-4">
                        * Calculations based on average customer savings and performance improvements
                      </div>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Start Your Free Trial
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalculatorIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Enter your hosting details above to see your potential savings
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
