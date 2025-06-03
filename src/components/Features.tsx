
import { Calculator, TrendingUp, Award, Users, Shield, Zap } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: "Accurate Cost Comparison",
      description: "Input your current hosting details and get instant, personalized cost comparisons with Cloudways plans."
    },
    {
      icon: TrendingUp,
      title: "Performance Metrics",
      description: "Compare loading speeds, uptime, and server response times to see real performance improvements."
    },
    {
      icon: Award,
      title: "Smart Recommendations",
      description: "Get tailored Cloudways plan recommendations based on your usage patterns and growth projections."
    },
    {
      icon: Users,
      title: "Feature Comparison",
      description: "Side-by-side comparison of storage, bandwidth, SSL, CDN, backups, and support levels."
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your data is secure with optional anonymous analytics and full compliance with privacy regulations."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Real-time calculations show immediate savings estimates and performance benefits."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Calculator?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make informed hosting decisions with comprehensive comparisons, 
            accurate calculations, and personalized recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
