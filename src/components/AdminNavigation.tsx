
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Edit, Eye, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AdminNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Only show admin navigation when on admin routes and user is authenticated
  if (!isAdminRoute || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/blog">
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="w-4 h-4" />
          View Blog
        </Button>
      </Link>
      <span className="flex items-center gap-2 text-sm text-green-600 font-medium">
        <BarChart3 className="w-4 h-4" />
        Admin Mode
      </span>
    </div>
  );
};
