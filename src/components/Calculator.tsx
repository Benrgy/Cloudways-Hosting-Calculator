
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CalculatorResults } from "./CalculatorResults";
import { FeatureComparison } from "./FeatureComparison";
import { PlanRecommendation } from "./PlanRecommendation";
import { ArrowRight, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculatorInputs {
  monthlyHostingCost: number;
  storageGB: number;
  bandwidthGB: number;
  monthlyTraffic: number;
  responseTimeMS: number;
}

export const Calculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyHostingCost: 10,
    storageGB: 20,
    bandwidthGB: 100,
    monthlyTraffic: 5000,
    responseTimeMS: 1200
  });

  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState<any>(null);

  // Calculate Cloudways plan recommendation and costs
  const calculateResults = () => {
    // Simple plan recommendation logic
    let recommendedPlan = "";
    let cloudwaysCost = 0;
    
    if (inputs.storageGB <= 25 && inputs.bandwidthGB <= 1000) {
      recommendedPlan = "DigitalOcean Starter";
      cloudwaysCost = 10;
    } else if (inputs.storageGB <= 50 && inputs.bandwidthGB <= 2000) {
      recommendedPlan = "DigitalOcean Standard";
      cloudwaysCost = 22;
    } else if (inputs.storageGB <= 80 && inputs.bandwidthGB <= 3000) {
      recommendedPlan = "DigitalOcean Advanced";
      cloudwaysCost = 42;
    } else {
      recommendedPlan = "DigitalOcean Premium";
      cloudwaysCost = 80;
    }

    const monthlySavings = inputs.monthlyHostingCost - cloudwaysCost;
    const annualSavings = monthlySavings * 12;
    const savingsPercentage = ((monthlySavings / inputs.monthlyHostingCost) * 100);

    // Performance improvements (estimated)
    const performanceImprovement = {
      loadingSpeed: Math.min(300, Math.max(50, (inputs.responseTimeMS - 300) / inputs.responseTimeMS * 100)),
      uptime: 99.9,
      securityFeatures: 95
    };

    return {
      recommendedPlan,
      cloudwaysCost,
      monthlySavings,
      annualSavings,
      savingsPercentage,
      performanceImprovement,
      currentPerformance: {
        loadingSpeed: inputs.responseTimeMS,
        uptime: 98.5,
        securityFeatures: 60
      }
    };
  };

  const handleCalculate = () => {
    if (inputs.monthlyHostingCost <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid hosting cost",
        variant: "destructive",
      });
      return;
    }

    const results = calculateResults();
    setCalculationResults(results);
    setShowResults(true);

    toast({
      title: "Calculation Complete!",
      description: "Scroll down to see your personalized comparison results",
    });
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Form */}
      <Card className="border-emerald-200">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="monthlyHostingCost" className="text-base font-medium text-gray-700">
                  Current Monthly Hosting Cost ($)
                </Label>
                <Input
                  id="monthlyHostingCost"
                  type="number"
                  value={inputs.monthlyHostingCost}
                  onChange={(e) => handleInputChange('monthlyHostingCost', e.target.value)}
                  className="mt-2 text-lg"
                  placeholder="e.g., 15"
                />
              </div>

              <div>
                <Label htmlFor="storageGB" className="text-base font-medium text-gray-700">
                  Storage Needed (GB)
                </Label>
                <Input
                  id="storageGB"
                  type="number"
                  value={inputs.storageGB}
                  onChange={(e) => handleInputChange('storageGB', e.target.value)}
                  className="mt-2 text-lg"
                  placeholder="e.g., 20"
                />
              </div>

              <div>
                <Label htmlFor="bandwidthGB" className="text-base font-medium text-gray-700">
                  Monthly Bandwidth (GB)
                </Label>
                <Input
                  id="bandwidthGB"
                  type="number"
                  value={inputs.bandwidthGB}
                  onChange={(e) => handleInputChange('bandwidthGB', e.target.value)}
                  className="mt-2 text-lg"
                  placeholder="e.g., 100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="monthlyTraffic" className="text-base font-medium text-gray-700">
                  Monthly Visitors
                </Label>
                <Input
                  id="monthlyTraffic"
                  type="number"
                  value={inputs.monthlyTraffic}
                  onChange={(e) => handleInputChange('monthlyTraffic', e.target.value)}
                  className="mt-2 text-lg"
                  placeholder="e.g., 5000"
                />
              </div>

              <div>
                <Label htmlFor="responseTimeMS" className="text-base font-medium text-gray-700">
                  Current Response Time (ms)
                </Label>
                <Input
                  id="responseTimeMS"
                  type="number"
                  value={inputs.responseTimeMS}
                  onChange={(e) => handleInputChange('responseTimeMS', e.target.value)}
                  className="mt-2 text-lg"
                  placeholder="e.g., 1200"
                />
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Test at gtmetrix.com or similar tools
                </p>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-3"
                  size="lg"
                >
                  Calculate My Savings
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && calculationResults && (
        <div className="space-y-8">
          <CalculatorResults results={calculationResults} inputs={inputs} />
          <FeatureComparison />
          <PlanRecommendation 
            plan={calculationResults.recommendedPlan}
            cost={calculationResults.cloudwaysCost}
            savings={calculationResults.monthlySavings}
          />
        </div>
      )}
    </div>
  );
};
