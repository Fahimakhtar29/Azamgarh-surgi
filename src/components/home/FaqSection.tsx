import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { brandConfig } from '../../config/brandConfig';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are the medical devices sold on this website original and certified?',
      a: 'Yes, 100%. All devices (Dr. Morepen, Omron, Dr Trust, Accu-Chek, BPL, etc.) are procured directly through authorized Indian distributor channels and carry official manufacturer warranty cards, holographic security seals, and authentic serial numbers.'
    },
    {
      q: 'How does warranty claim work for digital BP monitors and glucometers?',
      a: 'Every product includes the official manufacturer warranty card and invoice. In addition, our customer care team helps you register your device with the respective brand service center or coordinates replacement in case of early operational defects.'
    },
    {
      q: 'What is the shelf life/expiry of blood glucose test strips sent to customers?',
      a: 'We adhere to a strict minimum 18-month shelf-life rule for all test strips and sterile lancets. You will never receive short-expiry or heat-damaged testing strips.'
    },
    {
      q: 'How do I know which cuff size to choose for a blood pressure monitor?',
      a: 'Most of our monitors come with Standard/Universal cuffs fitting upper arm circumferences between 22 cm and 42 cm. If a patient has larger arms or biceps, we also stock extra-large conical cuffs.'
    },
    {
      q: 'Can I place an order via WhatsApp or Phone Call?',
      a: 'Yes! Every product page features an "Order on WhatsApp" button that automatically creates an order request with device details, price, and your delivery pincode. You can also call our customer helpdesk directly at +91 94520 89211.'
    },
    {
      q: 'Is Cash on Delivery (COD) available for all Indian PIN codes?',
      a: 'Yes, Cash on Delivery is available across 19,000+ Indian PIN codes. You can also pay via UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, or Net Banking.'
    }
  ];

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Everything you need to know about buying medical devices and home health equipment online.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 hover:text-teal-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
