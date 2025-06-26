
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, Database, Shield } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";

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

interface CalculatorInputsProps {
  inputs: AdvancedCalculatorInputs;
  onInputChange: (field: keyof AdvancedCalculatorInputs, value: string | number | boolean) => void;
  onCalculate: () => void;
  isCalculating: boolean;
}

export const CalculatorInputs = ({ inputs, onInputChange, onCalculate, isCalculating }: CalculatorInputsProps) => {
  return (
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
            onChange={(e) => onInputChange('monthlyHostingCost', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => onInputChange('numberOfWebsites', parseInt(e.target.value) || 1)}
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
            onChange={(e) => onInputChange('monthlyTraffic', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => onInputChange('responseTimeMS', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => onInputChange('storageGB', parseFloat(e.target.value) || 0)}
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
            onChange={(e) => onInputChange('bandwidthGB', parseFloat(e.target.value) || 0)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="ramGB" className="text-base font-medium text-gray-700">
            RAM Required (GB)
          </Label>
          <Select onValueChange={(value) => onInputChange('ramGB', parseFloat(value))}>
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
          <Select onValueChange={(value) => onInputChange('cpuCores', parseInt(value))}>
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
            onCheckedChange={(checked) => onInputChange('sslRequired', checked)}
          />
        </div>

        <div>
          <Label htmlFor="complianceNeeds" className="text-base font-medium text-gray-700">
            Compliance Requirements
          </Label>
          <Select onValueChange={(value) => onInputChange('complianceNeeds', value)}>
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
          <Select onValueChange={(value) => onInputChange('backupFrequency', value)}>
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
            onCheckedChange={(checked) => onInputChange('cdnRequired', checked)}
          />
        </div>

        <div className="pt-4">
          <Button 
            onClick={onCalculate}
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
  );
};
