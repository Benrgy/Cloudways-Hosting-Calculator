
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calculator, Save, Share2, Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedCalculations } from "@/hooks/useSavedCalculations";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AdvancedInputs {
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
  loadBalancer: boolean;
  managedServices: boolean;
}

export const EnhancedCalculator = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { saveCalculation } = useSavedCalculations();
  const { trackCalculation, trackSaveCalculation } = useAnalytics();

  const [inputs, setInputs] = useState<AdvancedInputs>({
    monthlyHostingCost: 50,
    storageGB: 100,
    bandwidthGB: 1000,
    monthlyTraffic: 10000,
    responseTimeMS: 1500,
    numberOfWebsites: 1,
    sslRequired: true,
    complianceNeeds: "none",
    ramGB: 4,
    cpuCores: 2,
    backupFrequency: "daily",
    cdnRequired: false,
    loadBalancer: false,
    managedServices: true
  });

  const [results, setResults] = useState<any>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [calculationName, setCalculationName] = useState('');

  const calculateAdvancedResults = () => {
    // Advanced calculation logic considering all factors
    let baseScore = 0;
    let costMultiplier = 1;
    let recommendedPlan = "";
    let cloudwaysCost = 0;

    // Calculate complexity score
    baseScore += inputs.storageGB / 10;
    baseScore += inputs.bandwidthGB / 100;
    baseScore += inputs.numberOfWebsites * 3;
    baseScore += inputs.ramGB * 2;
    baseScore += inputs.cpuCores * 4;
    baseScore += inputs.sslRequired ? 2 : 0;
    baseScore += inputs.complianceNeeds !== "none" ? 8 : 0;
    baseScore += inputs.cdnRequired ? 3 : 0;
    baseScore += inputs.loadBalancer ? 5 : 0;
    baseScore += inputs.managedServices ? 4 : 0;

    // Determine plan based on complexity
    if (baseScore <= 20) {
      recommendedPlan = "DigitalOcean Starter";
      cloudwaysCost = 12;
    } else if (baseScore <= 40) {
      recommendedPlan = "DigitalOcean Standard";
      cloudwaysCost = 26;
    } else if (baseScore <= 70) {
      recommendedPlan = "DigitalOcean Advanced";
      cloudwaysCost = 48;
    } else if (baseScore <= 100) {
      recommendedPlan = "DigitalOcean Premium";
      cloudwaysCost = 88;
    } else {
      recommendedPlan = "DigitalOcean Enterprise";
      cloudwaysCost = 165;
    }

    // Add compliance costs
    if (inputs.complianceNeeds === "pci") cloudwaysCost += 25;
    if (inputs.complianceNeeds === "hipaa") cloudwaysCost += 40;
    if (inputs.complianceNeeds === "gdpr") cloudwaysCost += 15;

    // Add managed services cost
    if (inputs.managedServices) cloudwaysCost += 20;
    if (inputs.loadBalancer) cloudwaysCost += 15;

    const monthlySavings = inputs.monthlyHostingCost - cloudwaysCost;
    const annualSavings = monthlySavings * 12;
    const savingsPercentage = ((monthlySavings / inputs.monthlyHostingCost) * 100);

    // Calculate migration timeline
    const migrationWeeks = Math.ceil(inputs.numberOfWebsites * 1.5 + (inputs.complianceNeeds !== "none" ? 2 : 0));

    // Performance improvements
    const performanceGains = {
      loadingSpeed: Math.max(20, Math.min(75, (inputs.responseTimeMS - 400) / inputs.responseTimeMS * 100)),
      uptime: 99.95,
      securityScore: inputs.complianceNeeds !== "none" ? 98 : 92
    };

    const calculatedResults = {
      recommendedPlan,
      cloudwaysCost,
      monthlySavings,
      annualSavings,
      savingsPercentage,
      migrationWeeks,
      performanceGains,
      complexityScore: baseScore,
      features: {
        ssl: inputs.sslRequired,
        backup: inputs.backupFrequency,
        cdn: inputs.cdnRequired,
        loadBalancer: inputs.loadBalancer,
        compliance: inputs.complianceNeeds,
        managedServices: inputs.managedServices
      }
    };

    setResults(calculatedResults);
    trackCalculation(inputs, calculatedResults);

    toast({
      title: "Advanced Calculation Complete!",
      description: "Your detailed hosting analysis is ready.",
    });
  };

  const handleSaveCalculation = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save calculations.",
        variant: "destructive",
      });
      return;
    }

    if (!calculationName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your calculation.",
        variant: "destructive",
      });
      return;
    }

    saveCalculation({
      name: calculationName,
      inputs,
      results,
      tags: ['advanced', results?.recommendedPlan?.toLowerCase().replace(' ', '-')]
    });

    trackSaveCalculation(calculationName);
    setShowSaveDialog(false);
    setCalculationName('');
  };

  const handleInputChange = (field: keyof AdvancedInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            Advanced Hosting Calculator
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive analysis with compliance, security, and performance considerations
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Requirements</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
              <TabsTrigger value="compliance">Compliance & Security</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthlyHostingCost">Current Monthly Cost ($)</Label>
                  <Input
                    id="monthlyHostingCost"
                    type="number"
                    value={inputs.monthlyHostingCost}
                    onChange={(e) => handleInputChange('monthlyHostingCost', parseFloat(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="numberOfWebsites">Number of Websites</Label>
                  <Input
                    id="numberOfWebsites"
                    type="number"
                    min="1"
                    value={inputs.numberOfWebsites}
                    onChange={(e) => handleInputChange('numberOfWebsites', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="monthlyTraffic">Monthly Visitors</Label>
                  <Input
                    id="monthlyTraffic"
                    type="number"
                    value={inputs.monthlyTraffic}
                    onChange={(e) => handleInputChange('monthlyTraffic', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="responseTimeMS">Current Response Time (ms)</Label>
                  <Input
                    id="responseTimeMS"
                    type="number"
                    value={inputs.responseTimeMS}
                    onChange={(e) => handleInputChange('responseTimeMS', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="storageGB">Storage Required (GB)</Label>
                  <Input
                    id="storageGB"
                    type="number"
                    value={inputs.storageGB}
                    onChange={(e) => handleInputChange('storageGB', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="bandwidthGB">Monthly Bandwidth (GB)</Label>
                  <Input
                    id="bandwidthGB"
                    type="number"
                    value={inputs.bandwidthGB}
                    onChange={(e) => handleInputChange('bandwidthGB', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="ramGB">RAM Required (GB)</Label>
                  <Input
                    id="ramGB"
                    type="number"
                    value={inputs.ramGB}
                    onChange={(e) => handleInputChange('ramGB', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="cpuCores">CPU Cores Required</Label>
                  <Input
                    id="cpuCores"
                    type="number"
                    min="1"
                    value={inputs.cpuCores}
                    onChange={(e) => handleInputChange('cpuCores', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <Select
                      value={inputs.backupFrequency}
                      onValueChange={(value) => handleInputChange('backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Backups</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="cdnRequired">CDN Required</Label>
                    <Switch
                      id="cdnRequired"
                      checked={inputs.cdnRequired}
                      onCheckedChange={(checked) => handleInputChange('cdnRequired', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="loadBalancer">Load Balancer</Label>
                    <Switch
                      id="loadBalancer"
                      checked={inputs.loadBalancer}
                      onCheckedChange={(checked) => handleInputChange('loadBalancer', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sslRequired">SSL Certificate Required</Label>
                    <Switch
                      id="sslRequired"
                      checked={inputs.sslRequired}
                      onCheckedChange={(checked) => handleInputChange('sslRequired', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="managedServices">Managed Services</Label>
                    <Switch
                      id="managedServices"
                      checked={inputs.managedServices}
                      onCheckedChange={(checked) => handleInputChange('managedServices', checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div>
                <Label htmlFor="complianceNeeds">Compliance Requirements</Label>
                <Select
                  value={inputs.complianceNeeds}
                  onValueChange={(value) => handleInputChange('complianceNeeds', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Special Requirements</SelectItem>
                    <SelectItem value="gdpr">GDPR Compliance</SelectItem>
                    <SelectItem value="pci">PCI DSS Compliance</SelectItem>
                    <SelectItem value="hipaa">HIPAA Compliance</SelectItem>
                    <SelectItem value="sox">SOX Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center pt-6">
            <Button 
              onClick={calculateAdvancedResults}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-3"
              size="lg"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate Advanced Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      {results && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-green-800">Advanced Analysis Results</CardTitle>
              <div className="flex gap-2">
                {user && (
                  <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Calculation</DialogTitle>
                        <DialogDescription>
                          Give your calculation a name to save it for later reference.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="e.g., Production Environment Analysis"
                          value={calculationName}
                          onChange={(e) => setCalculationName(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveCalculation}>
                            Save Calculation
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="outline" size="sm" disabled>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-green-600">
                  ${results.monthlySavings?.toFixed(0)}
                </h3>
                <p className="text-sm text-gray-600">Monthly Savings</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-600">
                  ${results.annualSavings?.toFixed(0)}
                </h3>
                <p className="text-sm text-gray-600">Annual Savings</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-purple-600">
                  {results.migrationWeeks}
                </h3>
                <p className="text-sm text-gray-600">Migration Weeks</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-orange-600">
                  {results.complexityScore?.toFixed(0)}
                </h3>
                <p className="text-sm text-gray-600">Complexity Score</p>
              </div>
            </div>

            {/* Recommended Plan */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Recommended Plan</h3>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-emerald-600">{results.recommendedPlan}</h4>
                  <p className="text-gray-600">Optimized for your requirements</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${results.cloudwaysCost}/mo</p>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Save {results.savingsPercentage?.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Performance Improvements */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Expected Performance Improvements</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Loading Speed Improvement</span>
                    <span>{results.performanceGains?.loadingSpeed?.toFixed(1)}%</span>
                  </div>
                  <Progress value={results.performanceGains?.loadingSpeed} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Uptime Guarantee</span>
                    <span>{results.performanceGains?.uptime}%</span>
                  </div>
                  <Progress value={results.performanceGains?.uptime} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Security Score</span>
                    <span>{results.performanceGains?.securityScore}%</span>
                  </div>
                  <Progress value={results.performanceGains?.securityScore} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
