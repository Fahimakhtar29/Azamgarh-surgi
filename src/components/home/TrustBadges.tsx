import React from 'react';
import { ShieldCheck, Award, Lock, Truck, RotateCcw, Headphones } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Genuine Products',
      desc: '100% authentic batches from verified manufacturers'
    },
    {
      icon: Award,
      title: 'Manufacturer Warranty',
      desc: 'Full official brand warranty on every device'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      desc: 'Encrypted UPI, Cards, NetBanking & Cash on Delivery'
    },
    {
      icon: Truck,
      title: 'Pan-India Delivery',
      desc: 'Express dispatch across 19,000+ Indian PIN codes'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      desc: 'Hassle-free 7-day replacement for manufacturing defects'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      desc: 'Dedicated assistance for setup & calibration queries'
    }
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center mb-2 shrink-0 border border-teal-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  ✓ {b.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
