import React from 'react';
import { Heart, Check, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import careParentsImg from '../../assets/images/care_for_parents_1791435963399.jpg';
import { ProductCard } from '../product/ProductCard';

export const CareForParents: React.FC = () => {
  const { products, viewProduct, viewCategory } = useStore();

  // Curated parent care products
  const parentCareProducts = products.filter((p) =>
    ['bp-01', 'gl-01', 'po-01', 'hh-03', 'ort-05', 'hh-08'].includes(p.id)
  );

  return (
    <section className="py-14 bg-gradient-to-b from-teal-50/70 via-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Banner with emotional & clinical copy */}
        <div className="bg-white rounded-2xl border border-teal-200/80 shadow-md overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5 h-[280px] lg:h-[380px] overflow-hidden relative">
              <img
                src={careParentsImg}
                alt="Daughter checking senior father's blood pressure at home"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="bg-teal-700 font-bold px-2.5 py-1 rounded text-[11px] uppercase tracking-wide">
                  Senior Wellness Initiative
                </span>
                <p className="mt-2 text-slate-100 font-medium">
                  Designed for Indian seniors: large displays, Hindi voice guidance, and one-touch operation.
                </p>
              </div>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                <Heart className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
                <span>Family Healthcare Caregiving</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display leading-tight">
                Care For Your Parents — Delivered Directly to Their Door
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                "Simple healthcare tools can make everyday monitoring easier for the people you care about."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Large high-contrast screens for poor eyesight</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Voice readout talking monitors in Hindi</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Lightweight foldable walking sticks & supports</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Automatic shutoff and pain-free lancing lancets</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => viewCategory('combo-kits')}
                  className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Senior Care Kits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-slate-500">
                  Pre-assembled with batteries & easy Hindi/English guide
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products for Parents */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Recommended Healthcare Devices for Parents
            </h3>
            <button
              onClick={() => viewCategory('all')}
              className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {parentCareProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
