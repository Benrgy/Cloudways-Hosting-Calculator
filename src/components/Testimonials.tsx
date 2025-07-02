
import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'E-commerce Owner',
      company: 'TechStore Pro',
      content: t('testimonials.sarah') || 'The calculator saved me over $2,000 annually by helping me find the perfect Cloudways plan. My site loads 40% faster now!',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Web Developer',
      company: 'Creative Digital Agency',
      content: t('testimonials.marcus') || 'Incredible tool! It analyzed my hosting needs perfectly and recommended the ideal server configuration. Customer sites are running smoother than ever.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Emily Watson',
      role: 'Blogger & Content Creator',
      company: 'LifestyleBlog.com',
      content: t('testimonials.emily') || 'As a non-technical person, this calculator made hosting decisions so much easier. The detailed comparison helped me save money and improve performance.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'David Kim',
      role: 'Startup Founder',
      company: 'InnovateNow',
      content: t('testimonials.david') || 'The performance predictions were spot-on! Our application response time improved by 60% after switching to the recommended Cloudways plan.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Lisa Thompson',
      role: 'Digital Marketing Manager',
      company: 'Growth Marketing Co.',
      content: t('testimonials.lisa') || 'This calculator is a game-changer for agencies managing multiple client websites. It helps us make data-driven hosting decisions every time.',
      rating: 5,
      image: '/placeholder.svg'
    },
    {
      name: 'Ahmed Hassan',
      role: 'SaaS Developer',
      company: 'CloudTech Solutions',
      content: t('testimonials.ahmed') || 'The detailed analysis and recommendations were incredibly accurate. We reduced our hosting costs by 35% while improving reliability and speed.',
      rating: 5,
      image: '/placeholder.svg'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title') || 'What Our Users Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle') || 'Join thousands of satisfied users who have optimized their hosting costs and improved their website performance with our calculator.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <article 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
              role="article"
              aria-labelledby={`testimonial-${index}-name`}
            >
              <div className="flex items-center mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {renderStars(testimonial.rating)}
                <span className="sr-only">{testimonial.rating} out of 5 stars</span>
              </div>
              
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={`Profile picture of ${testimonial.name}`}
                  className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-200"
                  loading="lazy"
                  width="48"
                  height="48"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <cite>
                    <div id={`testimonial-${index}-name`} className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                      {testimonial.company && (
                        <>
                          <span className="mx-1" aria-hidden="true">•</span>
                          <span>{testimonial.company}</span>
                        </>
                      )}
                    </div>
                  </cite>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t('testimonials.trustTitle') || 'Trusted by Professionals Worldwide'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600" aria-label="Over 50,000 calculations performed">50K+</div>
                <div className="text-sm text-gray-600">{t('testimonials.calculations') || 'Calculations'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600" aria-label="Average 35% cost savings">35%</div>
                <div className="text-sm text-gray-600">{t('testimonials.avgSavings') || 'Avg. Savings'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600" aria-label="99.9% user satisfaction rate">99.9%</div>
                <div className="text-sm text-gray-600">{t('testimonials.satisfaction') || 'Satisfaction'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600" aria-label="24/7 support availability">24/7</div>
                <div className="text-sm text-gray-600">{t('testimonials.support') || 'Support'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
