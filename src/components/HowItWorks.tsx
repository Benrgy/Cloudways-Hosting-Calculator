
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Calculator,
      title: "Input Your Details",
      description: "Enter your current shared hosting cost, storage needs, bandwidth, and performance metrics."
    },
    {
      step: 2,
      icon: TrendingUp,
      title: "Get Instant Analysis",
      description: "Our calculator compares costs, performance, and features to show you potential savings and improvements."
    },
    {
      step: 3,
      icon: ArrowRight,
      title: "Choose Your Plan",
      description: "Get personalized Cloudways plan recommendations and migrate with confidence using our results."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized hosting recommendations in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-emerald-600" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full transform -translate-y-1/2 translate-x-4">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-100 text-emerald-700 rounded-full">
            <Calculator className="w-5 h-5 mr-2" />
            Get your free comparison in under 2 minutes
          </div>
        </div>
      </div>
    </section>
  );
};
