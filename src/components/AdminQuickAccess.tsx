
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AdminQuickAccess = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Only show when already authenticated and not on admin pages
  if (location.pathname.startsWith('/admin') || !user) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/admin">
        <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all gap-2">
          <Plus className="w-5 h-5" />
          <Settings className="w-5 h-5" />
          <span className="hidden sm:inline">Admin</span>
        </Button>
      </Link>
    </div>
  );
};
