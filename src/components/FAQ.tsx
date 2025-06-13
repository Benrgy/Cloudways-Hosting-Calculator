
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

export const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: "How accurate are the cost savings calculations?",
      answer: "Our calculator uses real Cloudways pricing and industry-standard shared hosting costs to provide accurate estimates. Results may vary based on your specific hosting provider and usage patterns, but we aim for 95%+ accuracy in our calculations."
    },
    {
      question: "Is my data secure when using the calculator?",
      answer: "Yes, your privacy is our priority. We only collect the information you voluntarily provide, and you can opt out of data collection at any time. All data is encrypted and stored securely, and we comply with GDPR and other privacy regulations."
    },
    {
      question: "Do I need to sign up to use the calculator?",
      answer: "No, you can use the basic calculator without signing up. However, creating a free account allows you to save your calculations, compare multiple scenarios, and receive personalized recommendations."
    },
    {
      question: "How does Cloudways compare to other managed hosting?",
      answer: "Cloudways offers excellent value with transparent pricing, multiple cloud providers, and robust features. Our calculator focuses on Cloudways because of their competitive pricing, reliability, and comprehensive feature set compared to traditional shared hosting."
    },
    {
      question: "What if my website has special requirements?",
      answer: "Our calculator covers common hosting scenarios. For websites with special requirements like high-traffic e-commerce, custom applications, or specific compliance needs, we recommend consulting with Cloudways directly for a custom solution."
    },
    {
      question: "Can I migrate my existing website to Cloudways?",
      answer: "Yes! Cloudways offers free migration services for most websites. Their expert team can help transfer your site, databases, and configurations with minimal downtime. The process typically takes 24-48 hours."
    },
    {
      question: "What support does Cloudways provide?",
      answer: "Cloudways provides 24/7 expert support via live chat and ticketing system. Unlike shared hosting support, you'll speak with server and application experts who can help with complex technical issues."
    },
    {
      question: "Are there any hidden costs with Cloudways?",
      answer: "No, Cloudways uses transparent, pay-as-you-use pricing. The calculator shows the base server costs, and you only pay for additional services you choose to use, like backups or advanced monitoring."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-emerald-600 py-4">
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a 
            href="mailto:support@hostingcalc.com" 
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};
