
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
    <div className="grid lg:grid-cols-3 gap-8" role="form" aria-label="Hosting calculator inputs">
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800 border-b pb-2">
          Current Hosting Details
        </legend>
        
        <div>
          <Label htmlFor="monthlyHostingCost" className="text-base font-medium text-gray-700">
            Monthly Hosting Cost ($)
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          </Label>
          <Input
            id="monthlyHostingCost"
            type="number"
            min="0"
            step="0.01"
            value={inputs.monthlyHostingCost}
            onChange={(e) => onInputChange('monthlyHostingCost', parseFloat(e.target.value) || 0)}
            className="mt-2"
            aria-describedby="cost-help"
            aria-required="true"
          />
          <p id="cost-help" className="text-sm text-gray-500 mt-1">
            Include all hosting-related costs including domains and add-ons
          </p>
        </div>

        <div>
          <Label htmlFor="numberOfWebsites" className="text-base font-medium text-gray-700">
            Number of Websites
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          </Label>
          <Input
            id="numberOfWebsites"
            type="number"
            min="1"
            max="100"
            value={inputs.numberOfWebsites}
            onChange={(e) => onInputChange('numberOfWebsites', parseInt(e.target.value) || 1)}
            className="mt-2"
            aria-required="true"
          />
        </div>

        <div>
          <Label htmlFor="monthlyTraffic" className="text-base font-medium text-gray-700">
            Monthly Visitors
          </Label>
          <Input
            id="monthlyTraffic"
            type="number"
            min="0"
            value={inputs.monthlyTraffic}
            onChange={(e) => onInputChange('monthlyTraffic', parseFloat(e.target.value) || 0)}
            className="mt-2"
            aria-describedby="traffic-help"
          />
          <p id="traffic-help" className="text-sm text-gray-500 mt-1">
            Approximate number of unique visitors per month
          </p>
        </div>

        <div>
          <Label htmlFor="responseTimeMS" className="text-base font-medium text-gray-700">
            Current Response Time (ms)
          </Label>
          <Input
            id="responseTimeMS"
            type="number"
            min="0"
            value={inputs.responseTimeMS}
            onChange={(e) => onInputChange('responseTimeMS', parseFloat(e.target.value) || 0)}
            className="mt-2"
            aria-describedby="response-help"
          />
          <div id="response-help" className="text-sm text-gray-500 mt-1 flex items-center">
            <Info className="w-4 h-4 mr-1" aria-hidden="true" />
            Test your site at gtmetrix.com or similar speed testing tools
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
          <Database className="w-5 h-5" aria-hidden="true" />
          Resource Requirements
        </legend>

        <div>
          <Label htmlFor="storageGB" className="text-base font-medium text-gray-700">
            Storage Needed (GB)
          </Label>
          <Input
            id="storageGB"
            type="number"
            min="0"
            step="0.1"
            value={inputs.storageGB}
            onChange={(e) => onInputChange('storageGB', parseFloat(e.target.value) || 0)}
            className="mt-2"
            aria-describedby="storage-help"
          />
          <p id="storage-help" className="text-sm text-gray-500 mt-1">
            Total disk space needed for your websites and files
          </p>
        </div>

        <div>
          <Label htmlFor="bandwidthGB" className="text-base font-medium text-gray-700">
            Monthly Bandwidth (GB)
          </Label>
          <Input
            id="bandwidthGB"
            type="number"
            min="0"
            step="0.1"
            value={inputs.bandwidthGB}
            onChange={(e) => onInputChange('bandwidthGB', parseFloat(e.target.value) || 0)}
            className="mt-2"
            aria-describedby="bandwidth-help"
          />
          <p id="bandwidth-help" className="text-sm text-gray-500 mt-1">
            Data transfer amount per month
          </p>
        </div>

        <div>
          <Label htmlFor="ramSelect" className="text-base font-medium text-gray-700">
            RAM Required (GB)
          </Label>
          <Select 
            onValueChange={(value) => onInputChange('ramGB', parseFloat(value))}
            value={inputs.ramGB.toString()}
          >
            <SelectTrigger 
              id="ramSelect"
              className="mt-2" 
              aria-describedby="ram-help"
            >
              <SelectValue placeholder="Select RAM amount" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 GB</SelectItem>
              <SelectItem value="2">2 GB</SelectItem>
              <SelectItem value="4">4 GB</SelectItem>
              <SelectItem value="8">8 GB</SelectItem>
              <SelectItem value="16">16 GB</SelectItem>
            </SelectContent>
          </Select>
          <p id="ram-help" className="text-sm text-gray-500 mt-1">
            Memory requirements for your applications
          </p>
        </div>

        <div>
          <Label htmlFor="cpuSelect" className="text-base font-medium text-gray-700">
            CPU Cores
          </Label>
          <Select 
            onValueChange={(value) => onInputChange('cpuCores', parseInt(value))}
            value={inputs.cpuCores.toString()}
          >
            <SelectTrigger 
              id="cpuSelect"
              className="mt-2"
              aria-describedby="cpu-help"
            >
              <SelectValue placeholder="Select CPU cores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Core</SelectItem>
              <SelectItem value="2">2 Cores</SelectItem>
              <SelectItem value="4">4 Cores</SelectItem>
              <SelectItem value="8">8 Cores</SelectItem>
            </SelectContent>
          </Select>
          <p id="cpu-help" className="text-sm text-gray-500 mt-1">
            Processing power needed for your workload
          </p>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5" aria-hidden="true" />
          Security & Features
        </legend>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="sslSwitch" className="text-base font-medium text-gray-700 cursor-pointer">
            SSL Certificate Required
          </Label>
          <Switch
            id="sslSwitch"
            checked={inputs.sslRequired}
            onCheckedChange={(checked) => onInputChange('sslRequired', checked)}
            aria-describedby="ssl-help"
          />
        </div>
        <p id="ssl-help" className="text-sm text-gray-500 -mt-2">
          HTTPS encryption for your website security
        </p>

        <div>
          <Label htmlFor="complianceSelect" className="text-base font-medium text-gray-700">
            Compliance Requirements
          </Label>
          <Select 
            onValueChange={(value) => onInputChange('complianceNeeds', value)}
            value={inputs.complianceNeeds}
          >
            <SelectTrigger 
              id="complianceSelect"
              className="mt-2"
              aria-describedby="compliance-help"
            >
              <SelectValue placeholder="Select compliance needs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="pci">PCI Compliance</SelectItem>
              <SelectItem value="hipaa">HIPAA Compliance</SelectItem>
            </SelectContent>
          </Select>
          <p id="compliance-help" className="text-sm text-gray-500 mt-1">
            Industry-specific security requirements
          </p>
        </div>

        <div>
          <Label htmlFor="backupSelect" className="text-base font-medium text-gray-700">
            Backup Frequency
          </Label>
          <Select 
            onValueChange={(value) => onInputChange('backupFrequency', value)}
            value={inputs.backupFrequency}
          >
            <SelectTrigger 
              id="backupSelect"
              className="mt-2"
              aria-describedby="backup-help"
            >
              <SelectValue placeholder="Select backup frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <p id="backup-help" className="text-sm text-gray-500 mt-1">
            How often your data should be backed up
          </p>
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="cdnSwitch" className="text-base font-medium text-gray-700 cursor-pointer">
            CDN Required
          </Label>
          <Switch
            id="cdnSwitch"
            checked={inputs.cdnRequired}
            onCheckedChange={(checked) => onInputChange('cdnRequired', checked)}
            aria-describedby="cdn-help"
          />
        </div>
        <p id="cdn-help" className="text-sm text-gray-500 -mt-2">
          Content Delivery Network for faster global performance
        </p>

        <div className="pt-4">
          <Button 
            onClick={onCalculate}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-3 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            size="lg"
            disabled={isCalculating}
            aria-describedby="calculate-help"
            type="button"
          >
            {isCalculating ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <span>Calculate Advanced Savings</span>
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </>
            )}
          </Button>
          <p id="calculate-help" className="text-sm text-gray-500 mt-2 text-center">
            Get your personalized hosting migration report with detailed recommendations
          </p>
        </div>
      </fieldset>
    </div>
  );
};
