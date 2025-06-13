
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight, Share2, Download, Gift, Timer, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConversionBoostersProps {
  calculatorResult?: any;
}

export const ConversionBoosters = ({ calculatorResult }: ConversionBoostersProps) => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);

  const cloudwaysLink = 'https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=conversion_booster&utm_campaign=savings_calculator';

  // Exit intent detection
  useEffect(() => {
    let isExitIntentShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isExitIntentShown) {
        setShowExitIntent(true);
        isExitIntentShown = true;
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Sticky CTA visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 1000;
      setShowStickyCTA(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-show lead magnet after time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadMagnet(true);
    }, 90000); // Show after 90 seconds

    return () => clearTimeout(timer);
  }, []);

  const shareResults = () => {
    const tweetText = calculatorResult 
      ? `I could save $${calculatorResult.monthlySavings}/month by switching to @Cloudways! Calculate your savings: ${window.location.href}` 
      : `Check out this Cloudways savings calculator! ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Check out my hosting savings!',
        text: tweetText,
        url: window.location.href
      });
    } else {
      // Fallback to Twitter
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
    }
  };

  const handleCloudwaysClick = (source: string) => {
    window.open(`${cloudwaysLink}&utm_content=${source}`, '_blank');
  };

  return (
    <>
      {/* Sticky CTA Bar for Mobile */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-emerald-600 text-white p-4 shadow-lg z-50 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">Ready to save money?</div>
              <div className="text-xs opacity-90">Start your free trial today!</div>
            </div>
            <Button 
              size="sm" 
              className="bg-white text-emerald-600 hover:bg-gray-100"
              onClick={() => handleCloudwaysClick('sticky_mobile')}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-4 z-40 space-y-3">
        {calculatorResult && (
          <Button
            size="sm"
            onClick={shareResults}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
            title="Share your savings"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        )}
        
        <Button
          size="sm"
          onClick={() => setShowLeadMagnet(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          title="Download migration guide"
        >
          <Download className="w-5 h-5" />
        </Button>
      </div>

      {/* Exit Intent Popup */}
      <Dialog open={showExitIntent} onOpenChange={setShowExitIntent}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Wait! Get 25% OFF Your First 3 Months
            </DialogTitle>
            <DialogDescription>
              Don't leave without claiming your exclusive Cloudways discount and migration checklist!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Gift className="w-8 h-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-1">
                      Exclusive Cloudways Offer + FREE Migration
                    </h4>
                    <p className="text-sm text-emerald-700 mb-2">
                      Get 25% off your first 3 months + free expert migration service when you start your Cloudways trial now.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                        ✓ 25% OFF 3 months
                      </Badge>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-xs">
                        ✓ Free migration
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                onClick={() => handleCloudwaysClick('exit_intent')}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Claim 25% Discount
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowExitIntent(false)}
                className="flex-1"
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Limited time offer. No credit card required for trial.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lead Magnet Popup */}
      <Dialog open={showLeadMagnet} onOpenChange={setShowLeadMagnet}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              🚀 Free Migration Checklist + Cloudways Trial
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Join 10,000+ website owners who successfully migrated to better hosting
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-3">What You'll Get Instantly:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>24-Point Migration Checklist (PDF)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>3-Day Free Cloudways Trial</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Free Expert Migration Service</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Performance Optimization Guide</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                size="lg"
                onClick={() => handleCloudwaysClick('lead_magnet')}
              >
                Get Free Trial + Migration Kit
                <Download className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="text-center space-y-2">
              <div className="flex justify-center gap-4">
                <Badge variant="outline" className="text-xs">
                  ✓ No spam ever
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ No credit card required
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ Cancel anytime
                </Badge>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Limited Time Offer Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Timer className="w-4 h-4" />
            <span>Limited Time: Get 3 months FREE on annual Cloudways plans</span>
            <Button 
              size="sm" 
              variant="secondary"
              className="ml-4 bg-white text-orange-600 hover:bg-gray-100"
              onClick={() => handleCloudwaysClick('banner_offer')}
            >
              Claim Offer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
