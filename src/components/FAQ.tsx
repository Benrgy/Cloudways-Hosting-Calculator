
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: "How accurate are the cost savings calculations?",
      answer: "Our calculator uses real Cloudways pricing and industry-standard shared hosting costs to provide accurate estimates. Results may vary based on your specific hosting provider and usage patterns, but we aim for 95%+ accuracy in our calculations. The calculator factors in renewal rate increases, hidden fees, and additional costs that shared hosting providers often charge."
    },
    {
      question: "Is my data secure when using the calculator?",
      answer: "Yes, your privacy is our priority. We only collect the information you voluntarily provide, and you can opt out of data collection at any time. All data is encrypted and stored securely, and we comply with GDPR and other privacy regulations. We never share your information with third parties without explicit consent."
    },
    {
      question: "Do I need to sign up to use the calculator?",
      answer: "No, you can use the basic calculator without signing up. However, creating a free account allows you to save your calculations, compare multiple scenarios, and receive personalized recommendations. We also provide additional features like migration planning and cost tracking for registered users."
    },
    {
      question: "How does Cloudways compare to other managed hosting?",
      answer: "Cloudways offers excellent value with transparent pricing, multiple cloud providers, and robust features. Unlike other managed hosting providers that lock you into their infrastructure, Cloudways lets you choose from DigitalOcean, Vultr, Linode, AWS, and Google Cloud. This gives you better pricing flexibility and performance options."
    },
    {
      question: "What if my website has special requirements?",
      answer: "Our calculator covers common hosting scenarios including e-commerce stores, high-traffic blogs, and business websites. For websites with special requirements like high-traffic e-commerce, custom applications, PCI/HIPAA compliance, or specific performance needs, we recommend consulting with Cloudways directly for a custom solution."
    },
    {
      question: "Can I migrate my existing website to Cloudways?",
      answer: "Yes! Cloudways offers free migration services for most websites. Their expert team can help transfer your site, databases, and configurations with minimal downtime. The process typically takes 24-48 hours. They support WordPress, Drupal, Joomla, Magento, and custom PHP applications. You can also use our step-by-step migration guide."
    },
    {
      question: "What support does Cloudways provide?",
      answer: "Cloudways provides 24/7 expert support via live chat and ticketing system. Unlike shared hosting support, you'll speak with server and application experts who can help with complex technical issues, server optimization, and troubleshooting. They also provide extensive documentation and video tutorials."
    },
    {
      question: "Are there any hidden costs with Cloudways?",
      answer: "No, Cloudways uses transparent, pay-as-you-use pricing. The calculator shows the base server costs, and you only pay for additional services you choose to use, like backups, CloudwaysCDN, or premium support. There are no setup fees, no contracts, and no surprise renewal rate increases."
    },
    {
      question: "How long does it take to see performance improvements?",
      answer: "Most users notice significant performance improvements within 24-48 hours of migration. Speed improvements are typically immediate due to SSD storage, optimized server configurations, and advanced caching. SEO improvements from better loading speeds usually become visible within 4-6 weeks."
    },
    {
      question: "What happens if I'm not satisfied with Cloudways?",
      answer: "Cloudways offers a 3-day free trial, so you can test their platform before committing. If you're not satisfied, you can easily migrate back to your previous hosting or try a different provider. There are no cancellation fees or long-term contracts. Our migration checklist includes a rollback plan for added peace of mind."
    },
    {
      question: "Can I use this calculator for multiple websites?",
      answer: "Absolutely! The calculator supports multiple website scenarios. You can input the total cost and resource requirements for all your websites, or calculate each site individually. Many users find significant savings when consolidating multiple shared hosting accounts onto a single Cloudways server."
    },
    {
      question: "Is Cloudways suitable for e-commerce websites?",
      answer: "Yes, Cloudways is excellent for e-commerce. They offer optimized hosting for Magento, WooCommerce, and other e-commerce platforms. Features include dedicated firewalls, SSL certificates, automatic backups, staging environments, and PCI compliance options. The improved loading speeds can directly increase conversion rates and sales."
    }
  ];

  // Add FAQ schema to page
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about migrating from shared hosting to Cloudways managed cloud hosting
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 hover:border-emerald-200 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-emerald-600 py-6">
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <div className="bg-emerald-50 rounded-xl p-8 max-w-2xl mx-auto border border-emerald-200">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-emerald-700 mb-6">
              Our hosting migration experts are here to help you make the best decision for your website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@migratehosting.calculator" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Our Experts
              </a>
              <a 
                href="https://cloudways.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Try Cloudways Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
