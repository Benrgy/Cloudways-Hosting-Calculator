
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star } from "lucide-react";

export const FeatureComparison = () => {
  const features = [
    {
      category: "Storage & Bandwidth",
      items: [
        { feature: "SSD Storage", shared: true, cloudways: true },
        { feature: "Unlimited Bandwidth", shared: false, cloudways: true },
        { feature: "CDN Included", shared: false, cloudways: true },
        { feature: "Auto-scaling", shared: false, cloudways: true },
      ]
    },
    {
      category: "Security & Performance",
      items: [
        { feature: "Free SSL Certificate", shared: true, cloudways: true },
        { feature: "Advanced Firewall", shared: false, cloudways: true },
        { feature: "DDoS Protection", shared: false, cloudways: true },
        { feature: "Malware Scanning", shared: false, cloudways: true },
      ]
    },
    {
      category: "Backup & Support",
      items: [
        { feature: "Daily Backups", shared: false, cloudways: true },
        { feature: "1-Click Restore", shared: false, cloudways: true },
        { feature: "24/7 Expert Support", shared: false, cloudways: true },
        { feature: "Server Monitoring", shared: false, cloudways: true },
      ]
    },
    {
      category: "Developer Tools",
      items: [
        { feature: "Staging Environment", shared: false, cloudways: true },
        { feature: "Git Integration", shared: false, cloudways: true },
        { feature: "SSH Access", shared: false, cloudways: true },
        { feature: "Multiple PHP Versions", shared: false, cloudways: true },
      ]
    }
  ];

  const FeatureIcon = ({ available }: { available: boolean }) => {
    return available ? (
      <Check className="w-5 h-5 text-emerald-500" />
    ) : (
      <X className="w-5 h-5 text-gray-400" />
    );
  };

  return (
    <Card className="border-gray-200">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900 flex items-center justify-center">
          <Star className="w-6 h-6 text-emerald-500 mr-2" />
          Feature Comparison
        </CardTitle>
        <p className="text-gray-600">See what you get with Cloudways vs typical shared hosting</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                {category.category}
              </h4>
              
              <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
                  <div className="font-medium text-gray-700">Feature</div>
                  <div className="text-center font-medium text-gray-700">Shared Hosting</div>
                  <div className="text-center font-medium text-emerald-700">Cloudways</div>
                </div>
                
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-3 gap-4 py-2 hover:bg-gray-50 rounded-md px-2">
                    <div className="text-gray-800">{item.feature}</div>
                    <div className="flex justify-center">
                      <FeatureIcon available={item.shared} />
                    </div>
                    <div className="flex justify-center">
                      <FeatureIcon available={item.cloudways} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-emerald-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-emerald-900">Why Cloudways Wins</h5>
              <p className="text-emerald-700 text-sm mt-1">
                Get enterprise-level features, better performance, and expert support 
                at competitive pricing. Most shared hosting providers charge extra for 
                these premium features.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
