
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";

export const AdminQuickAccess = () => {
  const location = useLocation();
  
  // Only show when not on admin pages
  if (location.pathname.startsWith('/admin')) {
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
