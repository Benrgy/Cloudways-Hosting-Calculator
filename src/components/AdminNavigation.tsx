
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Edit, Eye, BarChart3 } from "lucide-react";

export const AdminNavigation = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex items-center gap-2">
      {!isAdminRoute ? (
        <Link to="/admin">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Admin Dashboard
          </Button>
        </Link>
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
