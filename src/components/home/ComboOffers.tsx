import React from 'react';
import { Package, ArrowRight, ShieldCheck, Zap, ShoppingCart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const ComboOffers: React.FC = () => {
  const { products, addToCart, viewProduct } = useStore();

  const comboKits = products.filter((p) => p.category === 'combo-kits');

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800">
              <Package className="w-3.5 h-3.5 text-rose-600" />
              <span>Value Healthcare Bundles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Curated Medical Combo Kits
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Save up to 48% with pre-assembled all-in-one home diagnostic starter packages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comboKits.map((combo) => (
            <div
              key={combo.id}
              onClick={() => viewProduct(combo)}
              className="group bg-slate-50 rounded-2xl border border-teal-200/90 overflow-hidden hover:border-teal-600 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <ImageWithFallback
                    src={combo.images[0]}
                    alt={combo.name}
                    category="combo-kits"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-xs px-2.5 py-1 rounded shadow-xs uppercase tracking-wide">
                    Save {combo.discountPercent}%
                  </div>
                  <div className="absolute top-3 right-3 bg-teal-900/90 text-white font-semibold text-[11px] px-2.5 py-1 rounded backdrop-blur-xs">
                    Bundle Offer
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
                    {combo.subcategory}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug group-hover:text-teal-900">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {combo.shortDescription}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="mt-3.5 p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                    <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wider">
                      What's Included:
                    </span>
                    <p className="text-[11px] text-slate-600 font-medium">
                      {combo.specifications.packageContents || combo.specifications.contents}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0">
                <div className="flex items-baseline justify-between mb-3 border-t border-slate-200 pt-3">
                  <div>
                    <span className="text-xl font-bold text-slate-900 font-mono tabular-nums">
                      ₹{combo.sellingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through ml-2 font-mono tabular-nums">
                      ₹{combo.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Free Delivery
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(combo, 1);
                    }}
                    className="py-2.5 px-3 bg-white hover:bg-teal-50 text-teal-900 border border-teal-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(combo, 1);
                    }}
                    className="py-2.5 px-3 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Buy Bundle</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
