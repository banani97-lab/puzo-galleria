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

  const faqs = [
    {
      question: "What is your shipping policy?",
      answer: "We offer free shipping within the EU. Orders are typically processed within 1-2 business days and delivered within 3-7 business days depending on your location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide. International shipping rates and delivery times vary depending on the destination. Please contact us for specific rates to your country."
    },
    {
      question: "How do I care for my PUZO products?",
      answer: "Each PUZO product comes with specific care instructions. Generally, we recommend storing items in a cool, dry place and cleaning them according to the provided guidelines."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. After this time, the order will be processed and cannot be changed. Please contact us immediately if you need to make changes."
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

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full text-left py-4 flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
              style={{ fontFamily: 'Bodoni, serif' }}
            >
              <span className="text-xl">{faq.question}</span>
              <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="pb-4" style={{ fontFamily: 'Bodoni, serif' }}>
                <p className="text-lg">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 