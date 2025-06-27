
import { CalculationResults, CalculationInputs } from '@/types/calculator';

interface AdvancedCalculatorInputs extends CalculationInputs {
  loadBalancer?: boolean;
  managedServices?: boolean;
}

export const useCalculatorLogic = () => {
  const calculateAdvancedResults = (inputs: AdvancedCalculatorInputs): CalculationResults => {
    // Advanced plan recommendation logic
    let recommendedPlan = "";
    let cloudwaysCost = 0;
    let features = {};
    
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
      features = { ssl: true, backup: "daily", cdn: false };
    } else if (totalScore <= 30) {
      recommendedPlan = "DigitalOcean Standard";
      cloudwaysCost = 22;
      features = { ssl: true, backup: "daily", cdn: true };
    } else if (totalScore <= 50) {
      recommendedPlan = "DigitalOcean Advanced";
      cloudwaysCost = 42;
      features = { ssl: true, backup: "daily", cdn: true };
    } else {
      recommendedPlan = "DigitalOcean Premium";
      cloudwaysCost = 80;
      features = { ssl: true, backup: "hourly", cdn: true };
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
      securityScore: inputs.complianceNeeds !== "none" ? 99 : 95
    };

    return {
      recommendedPlan,
      cloudwaysCost,
      monthlySavings,
      annualSavings,
      savingsPercentage,
      performanceGains: performanceImprovement,
      features: {
        ssl: inputs.sslRequired,
        backup: inputs.backupFrequency,
        cdn: inputs.cdnRequired,
        loadBalancer: inputs.loadBalancer || false,
        compliance: inputs.complianceNeeds,
        managedServices: inputs.managedServices || false
      }
    };
  };

  return { calculateAdvancedResults };
};
