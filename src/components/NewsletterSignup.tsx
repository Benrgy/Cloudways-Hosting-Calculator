
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/utils/emailService';

export const NewsletterSignup = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [preferences, setPreferences] = useState({
    newsletter: true,
    updates: true,
    marketing: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({
        email,
        name,
        source: 'newsletter_widget',
        preferences
      });

      if (result.success) {
        setIsSubscribed(true);
        toast({
          title: "Successfully Subscribed!",
          description: "Welcome! You'll receive our latest hosting insights and calculator updates.",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: result.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="text-center py-8">
          <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Welcome to Our Community!
          </h3>
          <p className="text-green-700">
            You're now subscribed to receive hosting insights, calculator updates, and exclusive tips.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2">
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
            <Gift className="w-3 h-3 mr-1" />
            Free Resources
          </Badge>
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Stay Updated
        </CardTitle>
        <CardDescription>
          Get the latest hosting insights, cost-saving tips, and calculator updates delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center"
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={preferences.newsletter}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, newsletter: !!checked }))
                }
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
                Weekly hosting insights and tips
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="updates"
                checked={preferences.updates}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, updates: !!checked }))
                }
              />
              <label htmlFor="updates" className="text-sm text-gray-700">
                Calculator updates and new features
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, marketing: !!checked }))
                }
              />
              <label htmlFor="marketing" className="text-sm text-gray-700">
                Special offers and promotions
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe for Free'}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Unsubscribe anytime. We respect your privacy and won't spam you.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
