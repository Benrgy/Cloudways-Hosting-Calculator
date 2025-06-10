
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Edit, Eye, BarChart3, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AdminNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (!user && isAdminRoute) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/auth">
          <Button variant="outline" size="sm" className="gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {!isAdminRoute ? (
        user ? (
          <Link to="/admin">
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Admin Dashboard
            </Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Admin Sign In
            </Button>
          </Link>
        )
      ) : (
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
      )}
    </div>
  );
};
