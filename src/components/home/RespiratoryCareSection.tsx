import React from 'react';
import { Wind, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import respImg from '../../assets/images/respiratory_care_showcase_1791435993258.jpg';

export const RespiratoryCareSection: React.FC = () => {
  const { products, viewCategory } = useStore();

  const respiratoryProducts = products.filter(
    (p) => p.category === 'nebulizers' || p.category === 'pulse-oximeters'
  ).slice(0, 4);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800">
              <Wind className="w-3.5 h-3.5 text-cyan-600" />
              <span>Pulmonary Health</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Respiratory & Inhalation Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Quiet mesh nebulizers, hospital compressor systems, fingertip SpO2 oximeters, and child masks.
            </p>
          </div>

          <button
            onClick={() => viewCategory('nebulizers')}
            className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All Nebulizers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Spotlight banner */}
          <div className="lg:col-span-4 bg-gradient-to-br from-cyan-900 to-teal-950 rounded-2xl p-6 text-white space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
              Seasonal Smog & Allergy Relief
            </span>
            <h3 className="text-xl font-bold font-display leading-snug">
              Breathe Freely with Fast Medication Delivery
            </h3>
            <p className="text-xs text-cyan-100 leading-relaxed">
              Our clinical compressor nebulizers turn prescribed liquid medication into aerosol droplets smaller than 3.0 microns, delivering relief deep into the bronchial tree.
            </p>
            <div className="space-y-1.5 text-xs text-cyan-200 pt-1">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pediatric & adult masks in every box</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Whisper-quiet models for sleeping babies</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>Universal tubes and spare air filters</span>
              </div>
            </div>
            <button
              onClick={() => viewCategory('nebulizers')}
              className="mt-2 w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Explore Nebulizer Machines
            </button>
          </div>

          {/* 3 Featured respiratory products */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {respiratoryProducts.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
