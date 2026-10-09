import React from 'react';
import { Scale, X, ShoppingCart, Star, Check, AlertCircle, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const ProductComparePage: React.FC = () => {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    addToCart,
    viewProduct,
    setActiveView
  } = useStore();

  if (compareList.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            No Products in Comparison
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            You can compare up to 4 medical devices side-by-side to evaluate display size, memory capacity, power source, and clinical accuracy.
          </p>
          <button
            onClick={() => setActiveView('category')}
            className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            Browse Medical Devices
          </button>
        </div>
      </div>
    );
  }

  const specRows = [
    { label: 'Brand', key: 'brand', isDirect: true },
    { label: 'Model', key: 'modelNumber' },
    { label: 'Device Category', key: 'subcategory' },
    { label: 'Display Type', key: 'displayType' },
    { label: 'Cuff Size / Sample', key: 'cuffSize', altKey: 'sampleVolume' },
    { label: 'Memory Capacity', key: 'memoryCapacity' },
    { label: 'Arrhythmia / Features', key: 'irregularHeartbeatDetection' },
    { label: 'Accuracy Standard', key: 'accuracy' },
    { label: 'Power Source', key: 'powerSource' },
    { label: 'Official Warranty', key: 'warranty', isDirect: true }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-teal-700" />
              <span>Side-by-Side Diagnostic Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
              Compare Medical Devices ({compareList.length}/4)
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {compareList.length < 4 && (
              <button
                onClick={() => setActiveView('category')}
                className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add More Devices</span>
              </button>
            )}
            <button
              onClick={clearCompare}
              className="px-3.5 py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Clear Comparison
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Header Product Cards Row */}
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 w-48 bg-slate-50/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 min-w-[220px] max-w-[260px] align-top relative">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-3 right-3 p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-slate-100 cursor-pointer"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="w-24 h-24 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden mb-3 mx-auto">
                      <ImageWithFallback
                        src={product.images[0]}
                        alt={product.name}
                        category={product.category}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <h3
                      onClick={() => viewProduct(product)}
                      className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-teal-900 cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 my-1.5 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">{product.rating}</span>
                      <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
                    </div>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-slate-900 font-mono">
                        ₹{product.sellingPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="mt-3 w-full py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Spec Attributes Rows */}
            <tbody className="divide-y divide-slate-100 text-xs">
              {specRows.map((row) => (
                <tr key={row.label} className="hover:bg-slate-50/50">
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">
                    {row.label}
                  </td>
                  {compareList.map((product) => {
                    let value: any = '-';
                    if (row.isDirect) {
                      value = (product as any)[row.key];
                    } else {
                      value =
                        product.specifications[row.key] ||
                        (row.altKey ? product.specifications[row.altKey] : null) ||
                        (product as any)[row.key] ||
                        '-';
                    }

                    return (
                      <td key={product.id} className="p-4 text-slate-800">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Yes
                            </span>
                          ) : (
                            'No'
                          )
                        ) : (
                          String(value)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
