import React from 'react';
import { ShieldCheck, Truck, Sparkles, Clock, Headphones, CheckCircle2 } from 'lucide-react';
import { brandConfig } from '../../config/brandConfig';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: ShieldCheck,
      title: 'Batch-Tested Authenticity',
      desc: 'Every blood pressure monitor and glucometer is checked for hologram integrity and serial verification before shipment.'
    },
    {
      icon: Truck,
      title: 'Medical Shockproof Packing',
      desc: 'Devices with delicate transducers and LCDs are cushioned in triple-layer air-bubble wrapping to guarantee pristine delivery.'
    },
    {
      icon: Clock,
      title: 'Fresh Test Strip Expiries',
      desc: 'We never dispatch short-expiry strips. All glucose test strips and chemical reagents carry 18+ months of shelf life.'
    },
    {
      icon: Headphones,
      title: 'WhatsApp Setup Assistance',
      desc: 'Need help wrapping your BP cuff or calibrating your meter? Our trained healthcare support team guides you via video or message.'
    }
  ];

  return (
    <section className="py-14 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            The Azamgarh Medical Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mt-1 text-white">
            Why Indian Families Trust {brandConfig.shortName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Home healthcare equipment is an investment in your family's safety. We treat every order with clinical seriousness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/60 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-900/60 text-teal-300 flex items-center justify-center border border-teal-700/40">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-display">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
