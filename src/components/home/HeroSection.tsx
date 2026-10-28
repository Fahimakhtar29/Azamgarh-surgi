import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Headphones, Activity } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import heroImage from '../../assets/images/hero_medical_devices_1791435948658.jpg';

export const HeroSection: React.FC = () => {
  const { viewCategory, setActiveView } = useStore();

  return (
    <section className="relative bg-gradient-to-b from-white via-orange-50/25 to-white text-slate-800 overflow-hidden py-10 lg:py-16 border-b border-slate-200/70">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs font-semibold text-[#E65100]">
              <Activity className="w-3.5 h-3.5 text-[#F57C00]" />
              <span>Certified Home Healthcare & Medical Diagnostics</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-[#0F172A] leading-[1.15]">
              Healthcare Essentials, <br />
              <span className="text-[#F57C00]">Delivered to Your Door</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
              Monitor, manage and care for your health with trusted healthcare devices and home-care essentials.
              Genuine blood pressure monitors, glucometers, nebulizers, and pulse oximeters with guaranteed manufacturer warranty.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => viewCategory('all')}
                className="px-6 py-3.5 bg-[#F57C00] hover:bg-[#E65100] text-white font-semibold rounded-xl text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-md shadow-orange-500/20 hover:shadow-orange-600/30"
              >
                <span>Shop Medical Devices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('offers')}
                className="px-6 py-3.5 bg-white hover:bg-orange-50 text-[#0F172A] font-semibold rounded-xl text-sm transition-colors border border-slate-200 shadow-2xs cursor-pointer"
              >
                Explore Best Sellers
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 text-xs text-slate-500">
              <div>
                <span className="block font-bold text-base sm:text-lg text-[#0F172A] font-mono">100%</span>
                <span className="text-slate-500">Authentic Devices</span>
              </div>
              <div>
                <span className="block font-bold text-base sm:text-lg text-[#0F172A] font-mono">50+</span>
                <span className="text-slate-500">Verified Equipment</span>
              </div>
              <div>
                <span className="block font-bold text-base sm:text-lg text-[#0F172A] font-mono">24–48h</span>
                <span className="text-slate-500">Fast Regional Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-orange-200/90 shadow-xl group bg-white">
              <img
                src={heroImage}
                alt="Digital upper-arm BP monitor, glucometer, pulse oximeter, and thermometer"
                className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating trust badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-white/95 backdrop-blur-md rounded-xl border border-orange-200 flex items-center justify-between text-xs text-slate-700 shadow-xl">
                <div>
                  <span className="block font-bold text-[#0F172A]">Azamgarh Direct Hub</span>
                  <span className="text-[11px] text-[#E65100] font-medium">Same-day dispatch for Eastern UP & Pan-India</span>
                </div>
                <span className="px-2.5 py-1 bg-[#F57C00] text-white font-bold rounded text-[11px] shadow-2xs">
                  Verified Stock
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
