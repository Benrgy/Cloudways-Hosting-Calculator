
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Trash2, Calendar, TrendingUp, Eye } from 'lucide-react';
import { useSavedCalculations } from '@/hooks/useSavedCalculations';
import { useToast } from '@/hooks/use-toast';

interface SavedCalculationsProps {
  onLoadCalculation: (inputs: any, results: any) => void;
}

export const SavedCalculations = ({ onLoadCalculation }: SavedCalculationsProps) => {
  const { calculations, isLoading, deleteCalculation, toggleFavorite } = useSavedCalculations();
  const { toast } = useToast();

  const handleLoadCalculation = (calculation: any) => {
    onLoadCalculation(calculation.inputs, calculation.results);
    toast({
      title: "Calculation Loaded",
      description: `Loaded "${calculation.name}"`,
    });
  };

  const handleDeleteCalculation = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteCalculation(id);
    }
  };

  const handleToggleFavorite = (id: string, currentFavorite: boolean) => {
    toggleFavorite({ id, isFavorite: !currentFavorite });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!calculations || calculations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Calculations</h3>
          <p className="text-gray-600 mb-4">
            Start using the calculator to save and track your hosting cost analyses.
          </p>
          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Start Calculating
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Saved Calculations ({calculations.length})</CardTitle>
          <CardDescription>
            Your saved hosting cost analyses and comparisons
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {calculations.map((calculation) => (
          <Card key={calculation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {calculation.name}
                    </h3>
                    {calculation.is_favorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(calculation.created_at).toLocaleDateString()}
                    </span>
                    {calculation.tags && calculation.tags.length > 0 && (
                      <div className="flex gap-1">
                        {calculation.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {calculation.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{calculation.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        ${calculation.results?.monthlySavings?.toFixed(0) || '0'}
                      </div>
                      <div className="text-xs text-gray-600">Monthly Savings</div>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        ${calculation.results?.annualSavings?.toFixed(0) || '0'}
                      </div>
                      <div className="text-xs text-gray-600">Annual Savings</div>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">
                        {calculation.results?.savingsPercentage?.toFixed(1) || '0'}%
                      </div>
                      <div className="text-xs text-gray-600">Cost Reduction</div>
                    </div>
                    
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">
                        {calculation.results?.recommendedPlan?.split(' ')[0] || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600">Recommended</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="sm"
                    onClick={() => handleLoadCalculation(calculation)}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Load
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleFavorite(calculation.id, calculation.is_favorite)}
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        calculation.is_favorite 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCalculation(calculation.id, calculation.name)}
                    className="text-red-600 hover:text-red-700 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
