import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Zap, Shield, Clock } from "lucide-react";

interface PlanRecommendationProps {
  plan: string;
  cost: number;
  savings: number;
}

export const PlanRecommendation = ({ plan, cost, savings }: PlanRecommendationProps) => {
  const handleSignUpClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181', '_blank');
  };

  const planFeatures = {
    "DigitalOcean Starter": [
      "1 GB RAM",
      "25 GB Storage",
      "1 TB Bandwidth",
      "Free SSL & Backups"
    ],
    "DigitalOcean Standard": [
      "2 GB RAM", 
      "50 GB Storage",
      "2 TB Bandwidth",
      "Free SSL & Backups"
    ],
    "DigitalOcean Advanced": [
      "4 GB RAM",
      "80 GB Storage", 
      "4 TB Bandwidth",
      "Free SSL & Backups"
    ],
    "DigitalOcean Premium": [
      "8 GB RAM",
      "160 GB Storage",
      "5 TB Bandwidth", 
      "Free SSL & Backups"
    ]
  };

  const features = planFeatures[plan as keyof typeof planFeatures] || planFeatures["DigitalOcean Starter"];

  return (
    <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Badge className="bg-emerald-500 text-white px-3 py-1">
            <Star className="w-4 h-4 mr-1" />
            Recommended For You
          </Badge>
        </div>
        <CardTitle className="text-2xl text-gray-900">
          {plan}
        </CardTitle>
        <p className="text-gray-600">Perfect match for your hosting needs</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="text-center p-6 bg-white rounded-lg border border-emerald-100">
          <div className="text-4xl font-bold text-emerald-600 mb-2">
            ${cost}
            <span className="text-lg text-gray-600 font-normal">/month</span>
          </div>
          {savings > 0 && (
            <div className="text-emerald-700">
              Save ${savings.toFixed(2)}/month vs your current hosting
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">What You Get:</h4>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-emerald-100">
          <div className="text-center">
            <Zap className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            <div className="text-xs text-gray-600">3x Faster</div>
          </div>
          <div className="text-center">
            <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Enterprise Security</div>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            <div className="text-xs text-gray-600">99.9% Uptime</div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button 
            onClick={handleSignUpClick}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-6"
            size="lg"
          >
            Get Started with Cloudways
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-center text-sm text-gray-600">
            30-day money-back guarantee • No setup fees • Migrate for free
          </p>
        </div>

        {/* Testimonial */}
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <p className="text-sm text-emerald-800 italic">
            "Migrating to Cloudways was the best decision for my business. 
            My site loads 3x faster and I save $40/month!"
          </p>
          <div className="text-xs text-emerald-600 mt-2">- Sarah K., E-commerce Owner</div>
        </div>
      </CardContent>
    </Card>
  );
};
