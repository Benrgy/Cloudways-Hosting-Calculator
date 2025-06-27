
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, History, User, BarChart3, FileText, Settings, Star } from 'lucide-react';
import { SavedCalculations } from '@/components/SavedCalculations';
import { ProfileManagement } from '@/components/ProfileManagement';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Calculator as CalculatorComponent } from '@/components/Calculator';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('calculator');

  // Redirect if not authenticated
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Fetch user's saved calculations count
  const { data: calculationsCount } = useQuery({
    queryKey: ['calculations-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('saved_calculations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id || '');
      return count || 0;
    },
  });

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id || '')
        .single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {profile?.full_name || user?.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600">Manage your hosting calculations and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                {calculationsCount || 0} Saved Calculations
              </Badge>
              <Button variant="outline" onClick={() => setActiveTab('profile')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Saved
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hosting Cost Calculator</CardTitle>
                <CardDescription>
                  Calculate and compare hosting costs across different providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalculatorComponent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <SavedCalculations 
              onLoadCalculation={(inputs, results) => {
                console.log('Loading calculation:', inputs, results);
                setActiveTab('calculator');
              }} 
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PDF Reports</CardTitle>
                <CardDescription>
                  Generate and download detailed comparison reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">PDF Reports Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    Generate professional PDF reports with detailed cost comparisons and recommendations.
                  </p>
                  <Button disabled>
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
