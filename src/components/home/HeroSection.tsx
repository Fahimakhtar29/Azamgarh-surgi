import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Headphones, Activity } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import heroImage from '../../assets/images/hero_medical_devices_1791435948658.jpg';

export const HeroSection: React.FC = () => {
  const { viewCategory, setActiveView } = useStore();

  return (
    <section className="relative bg-gradient-to-b from-teal-950 via-teal-900 to-slate-900 text-white overflow-hidden py-10 lg:py-16">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.2),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-800/60 border border-teal-600/40 rounded-full text-xs text-teal-200">
              <Activity className="w-3.5 h-3.5 text-teal-300" />
              <span>Certified Home Healthcare & Medical Diagnostics</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-[1.15]">
              Healthcare Essentials, <br />
              <span className="text-teal-300">Delivered to Your Door</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Monitor, manage and care for your health with trusted healthcare devices and home-care essentials.
              Genuine blood pressure monitors, glucometers, nebulizers, and pulse oximeters with guaranteed manufacturer warranty.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => viewCategory('all')}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-sm transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-lg shadow-teal-950/50 hover:shadow-teal-900/40"
              >
                <span>Shop Medical Devices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('offers')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors border border-white/20 cursor-pointer backdrop-blur-xs"
              >
                Explore Best Sellers
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-teal-800/50 text-xs text-slate-300">
              <div>
                <span className="block font-bold text-base sm:text-lg text-white font-mono">100%</span>
                <span className="text-slate-400">Authentic Devices</span>
              </div>
              <div>
                <span className="block font-bold text-base sm:text-lg text-white font-mono">50+</span>
                <span className="text-slate-400">Verified Equipment</span>
              </div>
              <div>
                <span className="block font-bold text-base sm:text-lg text-white font-mono">24–48h</span>
                <span className="text-slate-400">Fast Regional Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-teal-700/50 shadow-2xl group bg-slate-900">
              <img
                src={heroImage}
                alt="Digital upper-arm BP monitor, glucometer, pulse oximeter, and thermometer"
                className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating trust badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-teal-500/30 flex items-center justify-between text-xs text-slate-200 shadow-xl">
                <div>
                  <span className="block font-semibold text-white">Azamgarh Direct Hub</span>
                  <span className="text-[11px] text-teal-300">Same-day dispatch for Eastern UP & Pan-India</span>
                </div>
                <span className="px-2.5 py-1 bg-teal-700 text-white font-bold rounded text-[11px]">
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
