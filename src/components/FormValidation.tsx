
import { AlertCircle, CheckCircle } from "lucide-react";

interface ValidationMessageProps {
  type: "error" | "success" | "warning";
  message: string;
  className?: string;
}

export const ValidationMessage = ({ type, message, className = "" }: ValidationMessageProps) => {
  const styles = {
    error: "text-red-600 bg-red-50 border-red-200",
    success: "text-green-600 bg-green-50 border-green-200",
    warning: "text-yellow-600 bg-yellow-50 border-yellow-200"
  };

  const icons = {
    error: AlertCircle,
    success: CheckCircle,
    warning: AlertCircle
  };

  const Icon = icons[type];

  return (
    <div className={`flex items-center gap-2 p-3 rounded-md border text-sm ${styles[type]} ${className}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export const validateCalculatorInputs = (inputs: any) => {
  const errors: string[] = [];
  
  if (!inputs.monthlyHostingCost || inputs.monthlyHostingCost <= 0) {
    errors.push("Monthly hosting cost must be greater than $0");
  }
  
  if (inputs.monthlyHostingCost > 1000) {
    errors.push("Monthly hosting cost seems unusually high. Please verify the amount.");
  }
  
  if (!inputs.storageGB || inputs.storageGB <= 0) {
    errors.push("Storage requirement must be greater than 0 GB");
  }
  
  if (!inputs.bandwidthGB || inputs.bandwidthGB <= 0) {
    errors.push("Bandwidth requirement must be greater than 0 GB");
  }
  
  if (!inputs.monthlyTraffic || inputs.monthlyTraffic <= 0) {
    errors.push("Monthly visitors must be greater than 0");
  }
  
  if (!inputs.responseTimeMS || inputs.responseTimeMS <= 0) {
    errors.push("Response time must be greater than 0 milliseconds");
  }
  
  if (inputs.responseTimeMS > 10000) {
    errors.push("Response time over 10 seconds seems unusually high");
  }

  return errors;
};
