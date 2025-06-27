
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calculator, DollarSign, Users, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CalculationResults } from '@/types/calculator';

export const AnalyticsDashboard = () => {
  const { user } = useAuth();

  // Fetch user's analytics data
  const { data: analytics } = useQuery({
    queryKey: ['user-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .eq('user_id', user?.id || '')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data;
    },
  });

  // Fetch saved calculations for trends
  const { data: calculations } = useQuery({
    queryKey: ['user-calculations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_calculations')
        .select('*')
        .eq('user_id', user?.id || '')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Process data for charts with proper type casting
  const savingsData = calculations?.map(calc => {
    const results = calc.results as unknown as CalculationResults;
    return {
      name: calc.name,
      monthly: results?.monthlySavings || 0,
      annual: results?.annualSavings || 0,
    };
  }) || [];

  const usageData = [
    { name: 'Calculations', value: calculations?.length || 0 },
    { name: 'Analytics Events', value: analytics?.length || 0 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

  const stats = [
    {
      title: 'Total Calculations',
      value: calculations?.length || 0,
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Potential Monthly Savings',
      value: `$${savingsData.reduce((sum, item) => sum + item.monthly, 0).toFixed(0)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Potential Annual Savings',
      value: `$${savingsData.reduce((sum, item) => sum + item.annual, 0).toFixed(0)}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      title: 'Analytics Events',
      value: analytics?.length || 0,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Comparison</CardTitle>
            <CardDescription>Monthly vs Annual savings across calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="monthly" fill="#10B981" name="Monthly Savings" />
                <Bar dataKey="annual" fill="#3B82F6" name="Annual Savings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Your activity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest calculations and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {calculations?.slice(0, 5).map((calc) => {
              const results = calc.results as unknown as CalculationResults;
              return (
                <div key={calc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{calc.name}</h4>
                    <p className="text-sm text-gray-600">
                      Created {new Date(calc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      ${results?.monthlySavings?.toFixed(0) || 0}/mo saved
                    </p>
                    <p className="text-xs text-gray-500">
                      ${results?.annualSavings?.toFixed(0) || 0}/yr
                    </p>
                  </div>
                </div>
              );
            }) || (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No calculations yet. Start calculating to see your analytics!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
