import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const BestSellers: React.FC = () => {
  const { products, viewCategory } = useStore();

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Verified Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Best Sellers in Healthcare & Diagnostics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Top-rated blood pressure monitors, glucometers, nebulizers, and vital testing equipment.
            </p>
          </div>

          <button
            onClick={() => viewCategory('all')}
            className="text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
