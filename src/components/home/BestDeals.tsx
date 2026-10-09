import React, { useState } from 'react';
import { Tag, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const BestDeals: React.FC = () => {
  const { products, setActiveView } = useStore();
  const [dealTab, setDealTab] = useState<'all' | 'under499' | 'under999' | 'highDiscount'>('all');

  const dealProducts = products.filter((p) => {
    if (dealTab === 'under499') return p.sellingPrice <= 499;
    if (dealTab === 'under999') return p.sellingPrice <= 999;
    if (dealTab === 'highDiscount') return p.discountPercent >= 40;
    return p.isOffer || p.discountPercent >= 35;
  }).slice(0, 8);

  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
              <Tag className="w-3.5 h-3.5 text-rose-600" />
              <span>Smart Savings on Diagnostics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Today's Healthcare Deals
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 self-start sm:self-auto overflow-x-auto">
            <button
              onClick={() => setDealTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                dealTab === 'all'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Deals
            </button>
            <button
              onClick={() => setDealTab('under499')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                dealTab === 'under499'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Under ₹499
            </button>
            <button
              onClick={() => setDealTab('under999')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                dealTab === 'under999'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Under ₹999
            </button>
            <button
              onClick={() => setDealTab('highDiscount')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                dealTab === 'highDiscount'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              40%+ Discount
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {dealProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setActiveView('offers')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-900 bg-white px-5 py-2.5 rounded-lg border border-teal-300 hover:bg-teal-50 transition-colors cursor-pointer"
          >
            <span>View All Discounted Healthcare Equipment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
