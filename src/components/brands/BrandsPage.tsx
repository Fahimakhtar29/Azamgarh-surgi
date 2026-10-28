import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { BRANDS } from '../../data/brands';
import { useStore } from '../../context/StoreContext';

export const BrandsPage: React.FC = () => {
  const { viewBrand } = useStore();

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#E65100] rounded-full text-xs font-bold border border-orange-200">
            <Award className="w-3.5 h-3.5 text-[#F57C00]" />
            <span>Authorized Equipment Distributors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display mt-2">
            Healthcare Brands Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Every brand featured in our catalog conforms to ISO clinical standards and comes with manufacturer backed warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {BRANDS.map((b) => (
            <div
              key={b.id}
              onClick={() => viewBrand(b.name)}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-[#F57C00]/70 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-[#E65100]">{b.country}</span>
                  <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    Verified
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#F57C00] transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{b.tagline}</p>
                <div className="mt-3 inline-block text-[11px] font-medium text-slate-700 bg-orange-50/80 px-2.5 py-1 rounded-md border border-orange-100">
                  Specialty: {b.popularCategory}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#F57C00] group-hover:underline">
                <span>View Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
