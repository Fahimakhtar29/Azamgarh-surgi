import React from 'react';
import { Activity, ArrowRight, HeartPulse, Check, Info } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const HeartBpCareSection: React.FC = () => {
  const { products, viewCategory } = useStore();

  const bpProducts = products.filter(
    (p) => p.category === 'bp-monitors' || p.category === 'stethoscopes'
  ).slice(0, 4);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
              <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
              <span>Cardiovascular Monitoring</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Heart & Blood Pressure Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Clinically validated digital monitors, Japanese IntelliSense technology, and clinical stethoscopes.
            </p>
          </div>

          <button
            onClick={() => viewCategory('bp-monitors')}
            className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All BP Monitors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {bpProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Educational Guide: "How to Use a Home BP Monitor Correctly" */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              <Info className="w-4 h-4 text-teal-700" />
              <span>Cardiology Clinical Advice</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              How to Use a Home BP Monitor Correctly
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Simple steps recommended by the Indian Society of Hypertension to prevent false high or low readings at home.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-teal-900 block mb-1 text-sm font-display">1. Preparation</span>
                <p className="text-slate-600">
                  Avoid caffeine, smoking, and vigorous exercise for 30 minutes before testing. Rest quietly in a chair with back supported for 5 minutes.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-teal-900 block mb-1 text-sm font-display">2. Cuff Placement</span>
                <p className="text-slate-600">
                  Wrap the cuff snugly around bare skin 1 inch (2–3 cm) above the bend of your elbow. The air tube should run straight down the center of your inner arm.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-teal-900 block mb-1 text-sm font-display">3. Arm Position</span>
                <p className="text-slate-600">
                  Rest your arm on a table so that the cuff sits level with your heart. Stay silent without speaking or shifting posture until measurement is complete.
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 italic">
              Informational medical guidance only. Consult your treating cardiologist for medication adjustments or persistent hypertensive readings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
