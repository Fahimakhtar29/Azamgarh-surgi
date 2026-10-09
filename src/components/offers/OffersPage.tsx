import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, Percent, Package } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../product/ProductCard';

export const OffersPage: React.FC = () => {
  const { products, coupons, applyCoupon, setIsCartDrawerOpen } = useStore();
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const under499Products = products.filter((p) => p.sellingPrice <= 499).slice(0, 4);
  const under999Products = products.filter((p) => p.sellingPrice > 499 && p.sellingPrice <= 999).slice(0, 4);
  const topDiscountProducts = products.filter((p) => p.discountPercent >= 40).slice(0, 4);
  const comboKits = products.filter((p) => p.category === 'combo-kits');

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold border border-rose-200">
            <Tag className="w-3.5 h-3.5" />
            <span>Healthcare Savings Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-2">
            Deals, Combos & Diagnostic Offers
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Save on trusted blood pressure monitors, glucometers, nebulizers, and family health packages with verified coupons.
          </p>
        </div>

        {/* Coupons Showcase */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display mb-4">
            Active Promo Codes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-5 bg-white rounded-2xl border-2 border-dashed border-teal-300 relative overflow-hidden flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-extrabold text-base text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                      {c.code}
                    </span>
                    <span className="text-[11px] font-bold text-rose-600">
                      {c.discountType === 'percentage'
                        ? `${c.discountValue}% OFF`
                        : `₹${c.discountValue} FLAT OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{c.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Min Order ₹{c.minOrderValue}</span>
                  <button
                    onClick={() => handleCopyCode(c.code)}
                    className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedCoupon === c.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Apply Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Under ₹499 Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Budget Care: Under ₹499
              </h2>
              <p className="text-xs text-slate-500">
                Thermometers, sterile lancets, test strip vials, and walking sticks.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {under499Products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Under ₹999 Section */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Everyday Diagnostics: Under ₹999
              </h2>
              <p className="text-xs text-slate-500">
                Instant glucometer kits, fingertip pulse oximeters, and body scales.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {under999Products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Top 40%+ Discounts */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Deep Discounts (40% OFF or More)
              </h2>
              <p className="text-xs text-slate-500">
                Major price drops on premium home healthcare equipment.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {topDiscountProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
