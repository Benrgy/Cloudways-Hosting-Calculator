
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from "lucide-react";

export const CalculatorHeader = () => {
  return (
    <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50">
      <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
        <Server className="w-6 h-6 text-emerald-600" />
        Advanced Hosting Migration Calculator
      </CardTitle>
      <p className="text-center text-gray-600">
        Get personalized recommendations based on your specific requirements
      </p>
    </CardHeader>
  );
};
