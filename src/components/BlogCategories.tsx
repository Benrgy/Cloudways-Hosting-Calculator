
import { Book, TrendingUp, Shield, Calculator, Video, FileText } from "lucide-react";

export const BlogCategories = () => {
  const categories = [
    {
      icon: Book,
      name: "Migration Guides",
      count: 12,
      description: "Step-by-step migration tutorials"
    },
    {
      icon: TrendingUp,
      name: "Performance",
      count: 8,
      description: "Speed and optimization tips"
    },
    {
      icon: Shield,
      name: "SEO Protection",
      count: 6,
      description: "Preserve rankings during migration"
    },
    {
      icon: Calculator,
      name: "Cost Analysis",
      count: 5,
      description: "Hosting cost comparisons"
    },
    {
      icon: Video,
      name: "Video Tutorials",
      count: 4,
      description: "Visual migration walkthroughs"
    },
    {
      icon: FileText,
      name: "Case Studies",
      count: 3,
      description: "Real migration success stories"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.name}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-500 transition-colors">
                    <IconComponent className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-emerald-600 text-sm font-medium">
                      {category.count} articles
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
