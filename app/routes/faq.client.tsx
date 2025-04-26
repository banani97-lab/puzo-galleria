import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { useState } from "react";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  return {};
}

export function HydrateFallback() {
  return <p>Loading FAQ...</p>;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSections = [
    {
      title: "Orders & Shipping",
      faqs: [
        {
          question: "Where do you ship?",
          answer: "We currently ship to all EU countries. For orders outside the EU, please note that customs fees may apply."
        },
        {
          question: "How long does shipping take?",
          answer: "We offer express shipping on all orders. Delivery times vary by location but typically range from 2-5 business days within the EU."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order has shipped, you will receive a tracking link via email. If you do not receive it, please check your spam folder or contact us."
        },
        {
          question: "Who covers customs/duties for international orders?",
          answer: "For orders outside the EU, customers are responsible for any applicable customs duties or import taxes charged upon arrival. PUZO is not responsible for delays due to customs processing."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 14 days from the delivery date. Items must be in their original condition, unworn, and in the original packaging with tags attached."
        },
        {
          question: "How do I request a return?",
          answer: "To initiate a return, please contact us at contact@puzo.com before sending any items back. Customers are responsible for return shipping costs."
        },
        {
          question: "Do you offer exchanges?",
          answer: "At this time, we do not offer direct exchanges. If you need a different item, we recommend returning your original purchase and placing a new order."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all Shopify-supported payment methods available in Denmark, including major credit cards and PayPal."
        },
        {
          question: "Are prices inclusive of tax?",
          answer: "Yes, all prices listed on our website include applicable taxes."
        }
      ]
    },
    {
      title: "Products and sizing",
      faqs: [
        {
          question: "How do I find my size?",
          answer: "Each product page includes a size guide to help you choose the right fit. If you're unsure, feel free to contact us for assistance."
        },
        {
          question: "Will sold-out items be restocked?",
          answer: "We do not guarantee restocks, as our collections are produced in limited quantities. Follow us on social media or subscribe to our newsletter for updates."
        },
        {
          question: "How should I care for my PUZO clothing?",
          answer: "To maintain the quality of your clothing, we recommend following the care instructions provided on the garment tag. Generally, we advise washing cold, air drying, and avoiding high heat."
        }
      ]
    },
    {
      title: "General Questions",
      faqs: [
        {
          question: "Where is PUZO based?",
          answer: "PUZO is based in Copenhagen, Denmark."
        },
        {
          question: "How can I contact customer service?",
          answer: "For any inquiries, you can reach us at contact@puzo.com. We aim to respond within 24-48 hours."
        },
        {
          question: "Do you have a physical store?",
          answer: "Currently, PUZO operates as an online store only. However, we may host pop-up events—stay updated by following us on social media."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-6" style={{ fontFamily: 'Bodoni, serif' }}>Frequently Asked Questions</h1>
      </div>

      <div className="space-y-12">
        {faqSections.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="text-4xl mb-6" style={{ fontFamily: 'Bodoni, serif' }}>{section.title}</h2>
            <div className="space-y-4">
              {section.faqs.map((faq, index) => {
                const globalIndex = sectionIndex * 10 + index;
                return (
                  <div key={globalIndex} className="border-b border-gray-200">
                    <button
                      className="w-full text-left py-4 flex justify-between items-center transition-colors duration-200"
                      onClick={() => toggleFAQ(globalIndex)}
                      style={{ fontFamily: 'Bodoni, serif' }}
                    >
                      <span className="text-xl">{faq.question}</span>
                      <img
                        src="/assets/plus.png"
                        alt="Toggle"
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openIndex === globalIndex ? 'rotate-45' : 'rotate-0'
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openIndex === globalIndex ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pb-4" style={{ fontFamily: 'Bodoni, serif' }}>
                        <p className="text-lg">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <ul>
        <li className="text-lg" style={{ fontFamily: 'Bodoni, serif' }}>For further questions, feel free to contact us.</li>
        <li className="text-lg mt-4" style={{ fontFamily: 'Bodoni, serif' }}>Thank you for supporting PUZO</li>
        </ul>
      </div>
    </div>
  );
} 