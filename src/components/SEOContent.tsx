
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, DollarSign, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const SEOContent = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main SEO Content */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('seo.title')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('seo.subtitle')}
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
                      {t('seo.performanceTitle')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('seo.performanceDesc')}
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
                      {t('seo.costTitle')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('seo.costDesc')}
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
                      {t('seo.securityTitle')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('seo.securityDesc')}
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
                      {t('seo.supportTitle')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t('seo.supportDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Migration Scenarios */}
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('seo.migrationScenariosTitle')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  {t('seo.wordpressSites')}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  {t('seo.ecommerceSites')}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  {t('seo.growingSites')}
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  {t('seo.businessSites')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
