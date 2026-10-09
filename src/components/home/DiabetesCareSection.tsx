import React from 'react';
import { Droplet, ArrowRight, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';
import diabetesImg from '../../assets/images/diabetes_care_showcase_1791435979935.jpg';

export const DiabetesCareSection: React.FC = () => {
  const { products, viewCategory } = useStore();

  const diabetesProducts = products.filter(
    (p) => p.category === 'glucometers' || p.category === 'glucose-strips'
  ).slice(0, 4);

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
              <Droplet className="w-3.5 h-3.5 text-teal-600" />
              <span>Glycemic Management</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Diabetes Care & Monitoring
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Accurate blood glucose meters, test strip multipacks, and pain-free sterile lancets.
            </p>
          </div>

          <button
            onClick={() => viewCategory('glucometers')}
            className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All Glucometers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {diabetesProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Educational Section: "Understanding Blood Sugar Monitoring" */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 h-60 rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <img
                src={diabetesImg}
                alt="Blood glucose monitor kit"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-teal-700" />
                <span>Patient Informational Guide</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-display">
                Understanding Blood Sugar Monitoring at Home
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 pt-2">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Fasting Blood Sugar</span>
                  <p className="text-slate-500">
                    Target range: 70–100 mg/dL after at least 8 hours without food.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Post-Prandial (2h)</span>
                  <p className="text-slate-500">
                    Target range: Under 140 mg/dL measured 2 hours after the start of a meal.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Testing Best Practice</span>
                  <p className="text-slate-500">
                    Always wash hands with warm water; never use alcohol wipes right before testing as residual alcohol can alter results.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 mt-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Important Clinical Notice:</strong> The values provided above are general educational reference ranges. Individual blood glucose targets vary depending on age, health condition, and medication. Always follow individualized targets specified by your consulting physician or endocrinologist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
