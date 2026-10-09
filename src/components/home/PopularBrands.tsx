import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { BRANDS } from '../../data/brands';
import { useStore } from '../../context/StoreContext';

export const PopularBrands: React.FC = () => {
  const { viewBrand } = useStore();

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>Certified Manufacturers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Popular Medical Brands
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We source directly from authorized Indian and global medical equipment distributors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {BRANDS.slice(0, 10).map((b) => (
            <div
              key={b.id}
              onClick={() => viewBrand(b.name)}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-600 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>{b.country}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {b.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                  {b.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-teal-700 font-semibold group-hover:underline">
                <span>{b.popularCategory}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
