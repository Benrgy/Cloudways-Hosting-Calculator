
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHostingProviders } from '@/hooks/useHostingProviders';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calculator as CalculatorIcon, DollarSign, TrendingDown, Save, Share2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CalculatorSkeleton } from './LoadingSkeleton';
import { Badge } from '@/components/ui/badge';

export const Calculator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { providers, isLoading, error } = useHostingProviders();
  const [currentCost, setCurrentCost] = useState('');
  const [traffic, setTraffic] = useState('');
  const [websites, setWebsites] = useState('1');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [results, setResults] = useState<{
    recommendedPlan: string;
    cloudwaysCost: number;
    monthlySavings: number;
    yearlyValue: number;
    performanceGain: number;
    features: string[];
  } | null>(null);

  const trafficMultipliers = {
    low: 1,
    medium: 1.5,
    high: 2.5,
    enterprise: 4
  };

  const calculateAdvancedSavings = () => {
    const current = parseFloat(currentCost) || 0;
    const numWebsites = parseInt(websites) || 1;
    const trafficMultiplier = trafficMultipliers[traffic as keyof typeof trafficMultipliers] || 1;
    
    // Find the selected plan details
    const provider = providers.find(p => p.id === selectedProvider);
    const plan = provider?.hosting_plans?.find(p => p.id === selectedPlan);
    
    let cloudwaysEstimate = 12; // Default starter plan
    let recommendedPlan = 'DigitalOcean Starter';
    let features = ['Free SSL', 'Daily Backups', '24/7 Support'];
    
    if (plan) {
      cloudwaysEstimate = plan.price_monthly;
      recommendedPlan = `${provider?.name} - ${plan.name}`;
      
      // Add features based on plan
      if (plan.features) {
        const planFeatures = plan.features as any;
        features = [
          ...features,
          ...(planFeatures.ssl ? ['Advanced SSL'] : []),
          ...(planFeatures.cdn ? ['Global CDN'] : []),
          ...(planFeatures.backup ? ['Automated Backups'] : []),
          ...(planFeatures.monitoring ? ['24/7 Monitoring'] : [])
        ];
      }
    } else {
      // Calculate based on traffic and websites
      const complexity = numWebsites * trafficMultiplier;
      
      if (complexity <= 2) {
        cloudwaysEstimate = 12;
        recommendedPlan = 'DigitalOcean Starter';
      } else if (complexity <= 5) {
        cloudwaysEstimate = 24;
        recommendedPlan = 'DigitalOcean Standard';
        features.push('Enhanced Performance', 'Advanced Caching');
      } else if (complexity <= 10) {
        cloudwaysEstimate = 48;
        recommendedPlan = 'DigitalOcean Advanced';
        features.push('High Performance', 'Load Balancing', 'Advanced Security');
      } else {
        cloudwaysEstimate = 88;
        recommendedPlan = 'DigitalOcean Premium';
        features.push('Enterprise Grade', 'Dedicated Resources', 'Priority Support');
      }
    }
    
    const monthlySavings = Math.max(0, current - cloudwaysEstimate);
    const yearlyValue = monthlySavings * 12;
    const performanceGain = Math.min(85, Math.max(25, 40 + (trafficMultiplier * 10)));

    setResults({
      recommendedPlan,
      cloudwaysCost: cloudwaysEstimate,
      monthlySavings,
      yearlyValue,
      performanceGain,
      features
    });

    toast({
      title: t('calculator.calculationComplete') || "Calculation Complete!",
      description: t('calculator.calculationCompleteDesc') || "Your hosting analysis is ready.",
    });
  };

  const handleSaveCalculation = () => {
    if (!results) return;
    
    const calculationData = {
      inputs: { currentCost, traffic, websites, selectedProvider, selectedPlan },
      results,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('lastCalculation', JSON.stringify(calculationData));
    
    toast({
      title: "Calculation Saved",
      description: "Your calculation has been saved locally.",
    });
  };

  const handleShareCalculation = () => {
    if (!results) return;
    
    const shareText = `Check out my hosting savings: $${results.monthlySavings}/month with ${results.recommendedPlan}!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Cloudways Calculator Results',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Calculation results copied to clipboard.",
      });
    }
  };

  // Load saved calculation on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastCalculation');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentCost(data.inputs.currentCost);
        setTraffic(data.inputs.traffic);
        setWebsites(data.inputs.websites);
        setSelectedProvider(data.inputs.selectedProvider);
        setSelectedPlan(data.inputs.selectedPlan);
      } catch (error) {
        console.error('Error loading saved calculation:', error);
      }
    }
  }, []);

  if (error) {
    return (
      <section id="calculator" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                {t('calculator.temporarilyUnavailable') || 'Calculator Temporarily Unavailable'}
              </h3>
              <p className="text-red-600">
                {t('calculator.workingToRestore') || "We're working to restore the calculator. Please try again later."}
              </p>
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
            {t('calculator.title') || 'Cloudways Hosting Calculator'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('calculator.subtitle') || 'Calculate your potential savings by switching to Cloudways hosting'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalculatorIcon className="w-5 h-5 mr-2 text-emerald-600" />
                    {t('calculator.currentHostingDetails') || 'Current Hosting Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading ? (
                    <CalculatorSkeleton />
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="current-cost">
                            {t('calculator.monthlyHostingCost') || 'Monthly Hosting Cost ($)'}
                          </Label>
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
                          <Label htmlFor="websites">
                            {t('calculator.numberOfWebsites') || 'Number of Websites'}
                          </Label>
                          <Input
                            id="websites"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={websites}
                            onChange={(e) => setWebsites(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="traffic">
                          {t('calculator.monthlyVisitors') || 'Monthly Visitors'}
                        </Label>
                        <Select value={traffic} onValueChange={setTraffic}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('calculator.selectTraffic') || "Select your monthly traffic"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">
                              {t('calculator.trafficLow') || 'Under 10K visitors'}
                            </SelectItem>
                            <SelectItem value="medium">
                              {t('calculator.trafficMedium') || '10K - 100K visitors'}
                            </SelectItem>
                            <SelectItem value="high">
                              {t('calculator.trafficHigh') || '100K - 500K visitors'}
                            </SelectItem>
                            <SelectItem value="enterprise">
                              {t('calculator.trafficEnterprise') || '500K+ visitors'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="provider">
                            {t('calculator.selectProvider') || 'Select Provider (Optional)'}
                          </Label>
                          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('calculator.chooseProvider') || "Choose provider"} />
                            </SelectTrigger>
                            <SelectContent>
                              {providers.map((provider) => (
                                <SelectItem key={provider.id} value={provider.id}>
                                  {provider.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="plan">
                            {t('calculator.selectPlan') || 'Select Plan (Optional)'}
                          </Label>
                          <Select 
                            value={selectedPlan} 
                            onValueChange={setSelectedPlan}
                            disabled={!selectedProvider}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('calculator.choosePlan') || "Choose plan"} />
                            </SelectTrigger>
                            <SelectContent>
                              {providers
                                .find(p => p.id === selectedProvider)
                                ?.hosting_plans?.map((plan) => (
                                  <SelectItem key={plan.id} value={plan.id}>
                                    {plan.name} - ${plan.price_monthly}/mo
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button 
                        onClick={calculateAdvancedSavings}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        disabled={!currentCost || !traffic}
                        size="lg"
                      >
                        <CalculatorIcon className="w-5 h-5 mr-2" />
                        {t('calculator.calculateSavings') || 'Calculate My Savings'}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingDown className="w-5 h-5 mr-2 text-emerald-600" />
                      {t('calculator.potentialSavings') || 'Your Potential Savings'}
                    </div>
                    {results && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={handleSaveCalculation}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleShareCalculation}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
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
                        <div className="text-gray-600">
                          {t('calculator.monthlySavings') || 'Monthly Savings'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            ${results.yearlyValue.toFixed(0)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {t('calculator.yearlyValue') || 'Yearly Value'}
                          </div>
                        </div>
                        
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                            <Zap className="w-5 h-5 mr-1" />
                            {results.performanceGain}%
                          </div>
                          <div className="text-sm text-gray-600">
                            {t('calculator.fasterLoading') || 'Faster Loading'}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">
                          {t('calculator.recommendedPlan') || 'Recommended Plan'}
                        </h4>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="font-medium text-emerald-600 mb-1">
                            {results.recommendedPlan}
                          </div>
                          <div className="text-lg font-bold">
                            ${results.cloudwaysCost}/mo
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">
                          {t('calculator.includedFeatures') || 'Included Features'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {results.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="text-xs text-gray-500 mb-2">
                          {t('calculator.calculationDisclaimer') || '* Calculations based on average customer savings and performance improvements'}
                        </div>
                        
                        {/* Social proof element */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-emerald-700 font-medium">✓ 10,000+ sites migrated successfully</span>
                            <div className="flex items-center gap-1 text-emerald-600">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                              <span>Free migration included</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3 font-semibold relative"
                          onClick={() => window.open('https://platform.cloudways.com/signup', '_blank')}
                        >
                          {t('calculator.startFreeTrial') || 'Start Saving Today - FREE Trial'}
                          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                            FREE
                          </span>
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-2">
                          No credit card • 3-day trial • Expert migration included
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <CalculatorIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {t('calculator.enterDetails') || 'Enter your hosting details above to see your potential savings'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
