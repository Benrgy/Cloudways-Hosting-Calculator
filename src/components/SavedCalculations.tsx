
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, FileText, Calendar } from "lucide-react";
import { getSavedCalculations, deleteCalculation, loadCalculation } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";

interface SavedCalculationsProps {
  onLoadCalculation: (inputs: any, results: any) => void;
}

export const SavedCalculations = ({ onLoadCalculation }: SavedCalculationsProps) => {
  const [savedCalculations, setSavedCalculations] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setSavedCalculations(getSavedCalculations());
  }, []);

  const handleLoad = (id: string) => {
    const calculation = loadCalculation(id);
    if (calculation) {
      onLoadCalculation(calculation.inputs, calculation.results);
      toast({
        title: "Calculation Loaded",
        description: `Loaded "${calculation.name}"`,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteCalculation(id);
    setSavedCalculations(getSavedCalculations());
    toast({
      title: "Calculation Deleted",
      description: "The saved calculation has been removed.",
    });
  };

  if (savedCalculations.length === 0) {
    return null;
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Saved Calculations ({savedCalculations.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {savedCalculations.map((calc) => (
            <div key={calc.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{calc.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(calc.timestamp).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                    ${calc.results?.monthlySavings?.toFixed(0) || '0'}/mo saved
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleLoad(calc.id)}
                >
                  Load
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(calc.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
