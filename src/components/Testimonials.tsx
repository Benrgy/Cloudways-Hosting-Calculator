
import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('testimonials.t1Name') || 'Sarah Johnson',
      role: t('testimonials.t1Role') || 'Web Developer',
      content: t('testimonials.t1Content') || 'This calculator helped me save over $200/month by finding the perfect Cloudways plan for my client projects. The accuracy and detailed breakdown are impressive!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b9ad1f61?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: t('testimonials.t2Name') || 'Mike Chen',
      role: t('testimonials.t2Role') || 'E-commerce Owner',
      content: t('testimonials.t2Content') || 'Finally, a tool that shows real costs without hidden fees. I was able to optimize my hosting setup and improve site performance while reducing costs.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: t('testimonials.t3Name') || 'Lisa Rodriguez',
      role: t('testimonials.t3Role') || 'Digital Agency Owner',
      content: t('testimonials.t3Content') || 'We use this calculator for all our client projects. It provides accurate estimates and helps us choose the right hosting solution every time.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title') || 'What Our Users Say'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle') || 'Join thousands of developers and business owners who trust our calculator to make smart hosting decisions.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              {/* Rating stars */}
              <div className="flex mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              
              {/* Testimonial content */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author info */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} - ${testimonial.role}`}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                  width="48"
                  height="48"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('testimonials.trust.title') || 'Trusted by Professionals Worldwide'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">50,000+</div>
                <div className="text-gray-600 text-sm">Calculations Made</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">$2M+</div>
                <div className="text-gray-600 text-sm">Total Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
                <div className="text-gray-600 text-sm">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
