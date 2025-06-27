
export interface CalculationResults {
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  recommendedPlan: string;
  cloudwaysCost: number;
  performanceGains?: {
    loadingSpeed: number;
    uptime: number;
    securityScore: number;
  };
  migrationWeeks?: number;
  complexityScore?: number;
  features?: {
    ssl: boolean;
    backup: string;
    cdn: boolean;
    loadBalancer: boolean;
    compliance: string;
    managedServices: boolean;
  };
}

export interface CalculationInputs {
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
  loadBalancer?: boolean;
  managedServices?: boolean;
}

export interface SavedCalculation {
  id: string;
  user_id: string;
  name: string;
  inputs: CalculationInputs;
  results: CalculationResults;
  tags: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}
