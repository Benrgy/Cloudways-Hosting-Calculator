
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, DollarSign, Shield } from "lucide-react";

export const SEOContent = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main SEO Content */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Migrate from Shared Hosting to Cloudways Cloud Hosting?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Shared hosting limitations can severely impact your website's performance, security, and scalability. 
              Our free migration calculator helps you understand the real costs and benefits of upgrading to 
              Cloudways managed cloud hosting.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Performance Improvements
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experience up to 300% faster loading speeds with SSD storage, advanced caching, 
                      and optimized server configurations. Better performance leads to improved SEO 
                      rankings and user experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Cost-Effective Scaling
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Pay only for resources you use with transparent pricing. No hidden fees, 
                      unlimited bandwidth charges, or surprise overages common with shared hosting providers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Enhanced Security
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dedicated firewalls, regular security patches, automated backups, and 
                      isolated server environments protect your website from threats common in shared hosting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      24/7 Expert Support
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get help from real server experts, not entry-level support. Cloudways provides 
                      knowledgeable assistance for complex technical issues and optimizations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Migration Scenarios */}
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Common Hosting Migration Scenarios
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong>WordPress Sites:</strong> Migrate from shared hosting to optimized WordPress hosting with better caching and performance
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong>E-commerce Stores:</strong> Ensure reliable uptime and fast loading for online stores with high traffic demands
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong>Growing Websites:</strong> Scale resources automatically as your website traffic and storage needs increase
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  <strong>Business Websites:</strong> Professional hosting with better security, backups, and support for business-critical sites
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
