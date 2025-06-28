
import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: t('testimonials.t1Name'),
      role: t('testimonials.t1Role'),
      content: t('testimonials.t1Content'),
      rating: 5
    },
    {
      name: t('testimonials.t2Name'),
      role: t('testimonials.t2Role'),
      content: t('testimonials.t2Content'),
      rating: 5
    },
    {
      name: t('testimonials.t3Name'),
      role: t('testimonials.t3Role'),
      content: t('testimonials.t3Content'),
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
