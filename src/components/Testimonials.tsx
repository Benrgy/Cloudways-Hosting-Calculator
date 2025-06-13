
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, DollarSign, Zap } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Store Owner",
      company: "Artisan Jewelry Co.",
      image: "/placeholder.svg",
      content: "After migrating from Bluehost to Cloudways, our online store's loading speed improved by 250%. Sales increased 32% in the first month alone due to better user experience. The cost savings of $780/year was just a bonus!",
      metrics: {
        speedImprovement: "250%",
        salesIncrease: "32%",
        yearlysavings: "$780"
      },
      beforeAfter: {
        loadTime: { before: "4.2s", after: "1.1s" },
        uptime: { before: "98.3%", after: "99.9%" },
        monthlyCost: { before: "$89", after: "$24" }
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Digital Marketing Agency Owner",
      company: "Growth Dynamics",
      image: "/placeholder.svg",
      content: "Managing 15+ client websites on Cloudways costs us 60% less than our previous hosting setup. The staging environments and Git integration have streamlined our development workflow dramatically.",
      metrics: {
        clientSites: "15+",
        costReduction: "60%",
        timesSaved: "20 hrs/week"
      },
      beforeAfter: {
        monthlyCost: { before: "$450", after: "$180" },
        managementTime: { before: "35 hrs/week", after: "15 hrs/week" },
        clientSatisfaction: { before: "85%", after: "96%" }
      }
    },
    {
      name: "Emma Thompson",
      role: "Food Blogger & Content Creator",
      company: "Healthy Eats Daily",
      image: "/placeholder.svg",
      content: "My blog went from averaging 2,000 monthly visitors to 50,000+ after migrating to Cloudways. The improved loading speeds boosted my SEO rankings significantly, and the reliable uptime keeps my audience engaged.",
      metrics: {
        trafficGrowth: "2500%",
        seoImprovement: "45 positions",
        uptimeGain: "1.6%"
      },
      beforeAfter: {
        monthlyVisitors: { before: "2,000", after: "50,000+" },
        avgPosition: { before: "85", after: "40" },
        bounceRate: { before: "68%", after: "42%" }
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real Success Stories from Our Users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours achieved dramatic improvements in performance, 
            cost savings, and growth after migrating to Cloudways
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-emerald-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-700 text-center mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-emerald-600 font-bold text-lg">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Before/After Comparison */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                    Before vs After Migration
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(testimonial.beforeAfter).map(([metric, values], compIndex) => (
                      <div key={compIndex} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 capitalize">
                          {metric.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 line-through">{values.before}</span>
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-green-600 font-medium">{values.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Profile */}
                <div className="flex items-center justify-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-emerald-600">{testimonial.company}</div>
                  </div>
                </div>

                {/* Success Badge */}
                <div className="flex justify-center mt-4">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    <Zap className="w-3 h-3 mr-1" />
                    Verified Success Story
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-emerald-50 rounded-xl p-8 max-w-2xl mx-auto border border-emerald-200">
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-emerald-700 mb-6">
              Use our calculator to see your potential savings and performance improvements. 
              Join thousands of satisfied customers who made the switch to Cloudways.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                <DollarSign className="w-3 h-3 mr-1" />
                Average 40% cost savings
              </Badge>
              <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                250% average speed improvement
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
