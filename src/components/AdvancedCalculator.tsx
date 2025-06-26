import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Info, Server, Shield, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { LoadingSpinner } from "./LoadingSpinner";
import { ValidationMessage, validateCalculatorInputs } from "./FormValidation";
import { EnhancedCalculatorResults } from "./EnhancedCalculatorResults";

interface AdvancedCalculatorInputs {
  monthlyHostingCost: number;
  storageGB: number;
  bandwidthGB: number;
  monthlyTraffic: number;
  responseTimeMS: number;
  numberOfWebsites: number;
  sslRequired: boolean;
  complianceNeeds: string;
  ramGB: number;
  cpuCores: number;
  backupFrequency: string;
  cdnRequired: boolean;
}

export const AdvancedCalculator = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [inputs, setInputs] = useState<AdvancedCalculatorInputs>({
    monthlyHostingCost: 15,
    storageGB: 20,
    bandwidthGB: 100,
    monthlyTraffic: 5000,
    responseTimeMS: 1200,
    numberOfWebsites: 1,
    sslRequired: true,
    complianceNeeds: "none",
    ramGB: 1,
    cpuCores: 1,
    backupFrequency: "daily",
    cdnRequired: false
  });

  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const calculateAdvancedResults = () => {
    // Advanced plan recommendation logic
    let recommendedPlan = "";
    let cloudwaysCost = 0;
    let features = [];
    
    // Determine plan based on multiple factors
    const totalScore = 
      (inputs.storageGB / 10) + 
      (inputs.bandwidthGB / 100) + 
      (inputs.numberOfWebsites * 2) + 
      (inputs.ramGB * 3) + 
      (inputs.cpuCores * 5) +
      (inputs.sslRequired ? 2 : 0) +
      (inputs.complianceNeeds !== "none" ? 5 : 0);

    if (totalScore <= 15) {
      recommendedPlan = "DigitalOcean Starter";
      cloudwaysCost = 10;
      features = ["1GB RAM", "1 Core CPU", "25GB Storage", "1TB Bandwidth"];
    } else if (totalScore <= 30) {
      recommendedPlan = "DigitalOcean Standard";
      cloudwaysCost = 22;
      features = ["2GB RAM", "1 Core CPU", "50GB Storage", "2TB Bandwidth"];
    } else if (totalScore <= 50) {
      recommendedPlan = "DigitalOcean Advanced";
      cloudwaysCost = 42;
      features = ["4GB RAM", "2 Core CPU", "80GB Storage", "4TB Bandwidth"];
    } else {
      recommendedPlan = "DigitalOcean Premium";
      cloudwaysCost = 80;
      features = ["8GB RAM", "4 Core CPU", "160GB Storage", "5TB Bandwidth"];
    }

    // Add compliance costs
    if (inputs.complianceNeeds === "pci") cloudwaysCost += 20;
    if (inputs.complianceNeeds === "hipaa") cloudwaysCost += 35;

    const monthlySavings = inputs.monthlyHostingCost - cloudwaysCost;
    const annualSavings = monthlySavings * 12;
    const savingsPercentage = ((monthlySavings / inputs.monthlyHostingCost) * 100);

    const performanceImprovement = {
      loadingSpeed: Math.min(300, Math.max(50, (inputs.responseTimeMS - 300) / inputs.responseTimeMS * 100)),
      uptime: 99.9,
      securityFeatures: inputs.complianceNeeds !== "none" ? 99 : 95
    };

    return {
      recommendedPlan,
      cloudwaysCost,
      monthlySavings,
      annualSavings,
      savingsPercentage,
      performanceImprovement,
      features,
      currentPerformance: {
        loadingSpeed: inputs.responseTimeMS,
        uptime: 98.5,
        securityFeatures: 60
      }
    };
  };

  const handleCalculate = async () => {
    console.log("Starting calculation with inputs:", inputs);
    
    // Validate inputs
    const errors = validateCalculatorInputs(inputs);
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below before calculating",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      try {
        const results = calculateAdvancedResults();
        console.log("Calculation results:", results);
        setCalculationResults(results);
        setShowResults(true);
        setIsCalculating(false);

        toast({
          title: "Calculation Complete!",
          description: "Your personalized hosting comparison is ready",
        });

        // Smooth scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('calculator-results');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } catch (error) {
        console.error("Calculation error:", error);
        setIsCalculating(false);
        toast({
          title: "Calculation Error",
          description: "There was an error calculating your results. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleInputChange = (field: keyof AdvancedCalculatorInputs, value: string | number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="border-emerald-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Server className="w-6 h-6 text-emerald-600" />
            Advanced Hosting Migration Calculator
          </CardTitle>
          <p className="text-center text-gray-600">
            Get personalized recommendations based on your specific requirements
          </p>
        </CardHeader>
        <CardContent className="p-8">
          {validationErrors.length > 0 && (
            <div className="mb-6 space-y-2">
              {validationErrors.map((error, index) => (
                <ValidationMessage key={index} type="error" message={error} />
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Current Hosting Details
              </h3>
              
              <div>
                <Label htmlFor="monthlyHostingCost" className="text-base font-medium text-gray-700">
                  Monthly Hosting Cost ($)
                </Label>
                <Input
                  id="monthlyHostingCost"
                  type="number"
                  value={inputs.monthlyHostingCost}
                  onChange={(e) => handleInputChange('monthlyHostingCost', parseFloat(e.target.value) || 0)}
                  className="mt-2"
                  aria-describedby="cost-help"
                />
                <p id="cost-help" className="text-sm text-gray-500 mt-1">
                  Include all hosting-related costs
                </p>
              </div>

              <div>
                <Label htmlFor="numberOfWebsites" className="text-base font-medium text-gray-700">
                  Number of Websites
                </Label>
                <Input
                  id="numberOfWebsites"
                  type="number"
                  value={inputs.numberOfWebsites}
                  onChange={(e) => handleInputChange('numberOfWebsites', parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="monthlyTraffic" className="text-base font-medium text-gray-700">
                  Monthly Visitors
                </Label>
                <Input
                  id="monthlyTraffic"
                  type="number"
                  value={inputs.monthlyTraffic}
                  onChange={(e) => handleInputChange('monthlyTraffic', parseFloat(e.target.value) || 0)}
                  className="mt-2"
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
                  onChange={(e) => handleInputChange('responseTimeMS', parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <Info className="w-4 h-4 mr-1" />
                  Test at gtmetrix.com or similar tools
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Resource Requirements
              </h3>

              <div>
                <Label htmlFor="storageGB" className="text-base font-medium text-gray-700">
                  Storage Needed (GB)
                </Label>
                <Input
                  id="storageGB"
                  type="number"
                  value={inputs.storageGB}
                  onChange={(e) => handleInputChange('storageGB', parseFloat(e.target.value) || 0)}
                  className="mt-2"
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
                  onChange={(e) => handleInputChange('bandwidthGB', parseFloat(e.target.value) || 0)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="ramGB" className="text-base font-medium text-gray-700">
                  RAM Required (GB)
                </Label>
                <Select onValueChange={(value) => handleInputChange('ramGB', parseFloat(value))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select RAM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 GB</SelectItem>
                    <SelectItem value="2">2 GB</SelectItem>
                    <SelectItem value="4">4 GB</SelectItem>
                    <SelectItem value="8">8 GB</SelectItem>
                    <SelectItem value="16">16 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cpuCores" className="text-base font-medium text-gray-700">
                  CPU Cores
                </Label>
                <Select onValueChange={(value) => handleInputChange('cpuCores', parseInt(value))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select CPU cores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Core</SelectItem>
                    <SelectItem value="2">2 Cores</SelectItem>
                    <SelectItem value="4">4 Cores</SelectItem>
                    <SelectItem value="8">8 Cores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Features
              </h3>

              <div className="flex items-center justify-between">
                <Label htmlFor="sslRequired" className="text-base font-medium text-gray-700">
                  SSL Certificate Required
                </Label>
                <Switch
                  id="sslRequired"
                  checked={inputs.sslRequired}
                  onCheckedChange={(checked) => handleInputChange('sslRequired', checked)}
                />
              </div>

              <div>
                <Label htmlFor="complianceNeeds" className="text-base font-medium text-gray-700">
                  Compliance Requirements
                </Label>
                <Select onValueChange={(value) => handleInputChange('complianceNeeds', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select compliance needs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="pci">PCI Compliance</SelectItem>
                    <SelectItem value="hipaa">HIPAA Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="backupFrequency" className="text-base font-medium text-gray-700">
                  Backup Frequency
                </Label>
                <Select onValueChange={(value) => handleInputChange('backupFrequency', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select backup frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="cdnRequired" className="text-base font-medium text-gray-700">
                  CDN Required
                </Label>
                <Switch
                  id="cdnRequired"
                  checked={inputs.cdnRequired}
                  onCheckedChange={(checked) => handleInputChange('cdnRequired', checked)}
                />
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-3"
                  size="lg"
                  disabled={isCalculating}
                  aria-describedby="calculate-help"
                >
                  {isCalculating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Calculate Advanced Savings
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
                <p id="calculate-help" className="text-sm text-gray-500 mt-2 text-center">
                  Get your personalized hosting migration report
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && calculationResults && (
        <div id="calculator-results">
          <EnhancedCalculatorResults results={calculationResults} inputs={inputs} />
        </div>
      )}
    </div>
  );
};
