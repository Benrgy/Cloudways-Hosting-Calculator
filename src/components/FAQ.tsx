
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
      question: "How much can I really save by switching to Cloudways?",
      answer: "Most users save 30-60% on their hosting costs when migrating from shared hosting to Cloudways. Our calculator shows exact savings based on your current setup. For example, if you're paying $50/month for shared hosting, you could potentially run the same websites on Cloudways for $22-35/month while getting better performance, security, and support."
    },
    {
      question: "How do I migrate my website to Cloudways?",
      answer: "Cloudways offers free migration services handled by their expert team. The process typically takes 24-48 hours with minimal downtime. They support WordPress, Drupal, Joomla, Magento, and custom PHP applications. You can also use our step-by-step migration guide included with the calculator results. The migration team handles everything including database transfers, file uploads, and DNS configuration."
    },
    {
      question: "Is Cloudways better than shared hosting providers like Bluehost or SiteGround?",
      answer: "Yes, in most cases. While shared hosting is cheaper initially, Cloudways offers superior performance, security, and scalability. You get dedicated resources, SSD storage, advanced caching, staging environments, and expert support. Shared hosting often has hidden costs, renewal rate increases, and performance limitations that Cloudways doesn't have. Our comparison tool shows the real cost difference including these factors."
    },
    {
      question: "Does Cloudways offer free migration and what support is included?",
      answer: "Yes, Cloudways provides free migration services for most websites, handled by their expert team. You also get 24/7 expert support via live chat and ticketing system - unlike shared hosting where you often wait hours for basic support. Their support team consists of server and application experts who can help with complex technical issues, optimization, and troubleshooting."
    },
    {
      question: "What are the main benefits of Cloudways over traditional shared hosting?",
      answer: "Key advantages include: dedicated server resources (no sharing with other sites), faster loading speeds with SSD storage and advanced caching, staging environments for testing, Git integration, automated backups, better security with dedicated firewalls, scalable resources, transparent pricing with no hidden fees, and expert 24/7 support. You also get choice of cloud providers (DigitalOcean, AWS, Google Cloud, etc.)."
    },
    {
      question: "Are there any hidden costs with Cloudways?",
      answer: "No, Cloudways uses transparent, pay-as-you-use pricing with no setup fees, no contracts, and no surprise renewal rate increases. Unlike shared hosting providers that often double prices after the first year, Cloudways pricing remains consistent. You only pay for additional services you choose like backups, CDN, or premium support. Our calculator factors in these potential hidden costs that shared hosting providers often charge."
    },
    {
      question: "How long does it take to see performance improvements after migrating?",
      answer: "Most users notice significant performance improvements within 24-48 hours of migration. Speed improvements are typically immediate due to SSD storage, optimized server configurations, and advanced caching systems. SEO improvements from better loading speeds usually become visible within 4-6 weeks as search engines re-crawl your faster site."
    },
    {
      question: "Can I use this calculator for multiple websites?",
      answer: "Absolutely! The calculator supports multiple website scenarios. You can input the total cost and resource requirements for all your websites, or calculate each site individually. Many users find significant savings when consolidating multiple shared hosting accounts onto a single Cloudways server, which can handle multiple websites efficiently."
    }
  ];

  const handleCloudwaysClick = () => {
    window.open('https://www.cloudways.com/en/?id=1384181&utm_source=calculator&utm_medium=faq_cta&utm_campaign=savings_calculator', '_blank');
  };

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
            Frequently Asked Questions About Cloudways Savings
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
              Calculate Your Savings & Start Your Free Trial
            </h3>
            <p className="text-emerald-700 mb-6">
              Ready to see how much you can save? Use our calculator above, then start your risk-free Cloudways trial with free expert migration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleCloudwaysClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
              >
                Start Free Cloudways Trial →
              </button>
              <a 
                href="#calculator" 
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Use Calculator First
              </a>
            </div>
            <p className="text-xs text-emerald-600 mt-4">
              No credit card required • Free migration included • 24/7 expert support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
