
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

export const useCalculatorLogic = () => {
  const calculateAdvancedResults = (inputs: AdvancedCalculatorInputs) => {
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

  return { calculateAdvancedResults };
};
