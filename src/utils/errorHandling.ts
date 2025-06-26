
import { toast } from "@/hooks/use-toast";

export class CalculatorError extends Error {
  constructor(message: string, public code: string, public recoverable: boolean = true) {
    super(message);
    this.name = 'CalculatorError';
  }
}

export const handleCalculatorError = (error: any, retryFn?: () => void) => {
  console.error('Calculator error:', error);
  
  if (error instanceof CalculatorError) {
    toast({
      title: "Calculation Error",
      description: error.message,
      variant: "destructive",
    });
    
    // If there's a retry function and the error is recoverable, call it after a delay
    if (error.recoverable && retryFn) {
      setTimeout(() => {
        console.log('Retrying calculation...');
        retryFn();
      }, 2000);
    }
  } else {
    toast({
      title: "Unexpected Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
    
    // If there's a retry function, call it after a delay
    if (retryFn) {
      setTimeout(() => {
        console.log('Retrying calculation...');
        retryFn();
      }, 2000);
    }
  }
};

export const validateInputs = (inputs: any): string[] => {
  const errors: string[] = [];
  
  if (inputs.monthlyHostingCost <= 0) {
    errors.push("Monthly hosting cost must be greater than $0");
  }
  
  if (inputs.monthlyHostingCost > 10000) {
    errors.push("Monthly hosting cost seems unusually high. Please verify.");
  }
  
  if (inputs.storageGB <= 0) {
    errors.push("Storage requirement must be greater than 0 GB");
  }
  
  if (inputs.bandwidthGB <= 0) {
    errors.push("Bandwidth requirement must be greater than 0 GB");
  }
  
  if (inputs.numberOfWebsites <= 0) {
    errors.push("Number of websites must be at least 1");
  }
  
  if (inputs.responseTimeMS <= 0) {
    errors.push("Response time must be greater than 0 ms");
  }
  
  return errors;
};
