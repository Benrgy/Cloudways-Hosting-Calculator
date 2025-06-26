
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { ValidationMessage, validateCalculatorInputs } from "./FormValidation";
import { EnhancedCalculatorResults } from "./EnhancedCalculatorResults";
import { CalculatorHeader } from "./CalculatorHeader";
import { CalculatorInputs } from "./CalculatorInputs";
import { useCalculatorLogic } from "@/hooks/useCalculatorLogic";

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
  const { calculateAdvancedResults } = useCalculatorLogic();
  
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
        const results = calculateAdvancedResults(inputs);
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
        <CalculatorHeader />
        <CardContent className="p-8">
          {validationErrors.length > 0 && (
            <div className="mb-6 space-y-2">
              {validationErrors.map((error, index) => (
                <ValidationMessage key={index} type="error" message={error} />
              ))}
            </div>
          )}

          <CalculatorInputs
            inputs={inputs}
            onInputChange={handleInputChange}
            onCalculate={handleCalculate}
            isCalculating={isCalculating}
          />
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
