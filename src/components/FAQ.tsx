import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
export const FAQ = () => {
  const {
    t
  } = useLanguage();
  const faqs = [{
    question: t('faq.q1') || 'How accurate is the Cloudways hosting calculator?',
    answer: t('faq.a1') || 'Our calculator uses real-time pricing data directly from Cloudways API to provide the most accurate cost estimates. All calculations are based on current market rates and include all applicable fees and taxes.'
  }, {
    question: t('faq.q2') || 'Can I compare different hosting plans?',
    answer: t('faq.a2') || 'Yes! Our calculator allows you to compare multiple Cloudways hosting plans side-by-side, including features, performance metrics, and total costs to help you make the best decision for your needs.'
  }, {
    question: t('faq.q3') || 'Does the calculator include all hosting costs?',
    answer: t('faq.a3') || 'Our calculator includes server costs, bandwidth charges, storage fees, and additional services. We provide transparent pricing with no hidden fees, so you know exactly what you\'ll pay.'
  }, {
    question: t('faq.q4') || 'Is this calculator free to use?',
    answer: t('faq.a4') || 'Yes, our Cloudways hosting calculator is completely free to use. You can calculate costs, compare plans, and get recommendations without any charges or registration required.'
  }, {
    question: t('faq.q5') || 'How often is the pricing data updated?',
    answer: t('faq.a5') || 'Our pricing data is updated in real-time to ensure accuracy. We sync with Cloudways\' official pricing regularly to provide you with the most current information available.'
  }, {
    question: t('faq.q6') || 'Can I save my calculations for later?',
    answer: t('faq.a6') || 'Yes, you can save your calculations and come back to them later. This feature helps you compare different scenarios and make informed decisions about your hosting needs.'
  }, {
    question: t('faq.q7') || 'What if I need help choosing a plan?',
    answer: t('faq.a7') || 'Our calculator provides personalized recommendations based on your requirements. If you need additional help, you can contact Cloudways support directly through their platform.'
  }, {
    question: t('faq.q8') || 'Does the calculator work for all Cloudways servers?',
    answer: t('faq.a8') || 'Yes, our calculator supports all Cloudways server types including DigitalOcean, AWS, Google Cloud, Vultr, and Linode. You can compare costs across all available platforms.'
  }];
  return <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title') || 'Frequently Asked Questions'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faq.subtitle') || 'Get answers to common questions about our Cloudways hosting calculator and how it can help you save money.'}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6 border border-gray-200 hover:border-gray-300 transition-colors">
                <AccordionTrigger className="text-left hover:no-underline py-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md">
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
        
        {/* Additional help section */}
        <div className="text-center mt-16">
          
        </div>
      </div>
    </section>;
};