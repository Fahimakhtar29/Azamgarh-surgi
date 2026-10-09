import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Shield,
  Truck,
  ShoppingCart,
  Zap,
  MessageCircle,
  Scale
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    viewProduct,
    addToCompare,
    isInCompare,
    sendWhatsAppOrder
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isCompared = isInCompare(product.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setSelectedImageIdx(0);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images gallery left */}
          <div>
            <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden border border-slate-200 relative">
              <ImageWithFallback
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                category={product.category}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIdx === i ? 'border-teal-700 ring-2 ring-teal-100' : 'border-slate-200'
                    }`}
                  >
                    <ImageWithFallback src={img} alt="thumb" category={product.category} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>{product.warranty}</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                100% genuine medical equipment verified with tamper-proof packaging.
              </p>
            </div>
          </div>

          {/* Details right */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-500 font-semibold tracking-wide uppercase text-teal-800">
                {product.brand} · {product.subcategory || product.category}
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                {product.name}
              </h2>
              <div className="text-xs text-slate-400 mt-0.5">SKU: {product.sku}</div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                </div>
                <span className="text-slate-500">({product.reviewCount} verified customer reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                  ₹{product.sellingPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                  ₹{product.mrp.toLocaleString('en-IN')} MRP
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {product.discountPercent}% OFF
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Inclusive of all taxes</p>

              <p className="text-xs text-slate-600 mt-3 line-clamp-3">
                {product.shortDescription || product.description}
              </p>

              {/* Quick specs highlights */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                {product.specifications.modelNumber && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Model:</span>
                    <span className="font-medium text-slate-800">{product.specifications.modelNumber}</span>
                  </div>
                )}
                {product.specifications.displayType && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Display:</span>
                    <span className="font-medium text-slate-800">{product.specifications.displayType}</span>
                  </div>
                )}
                {product.specifications.powerSource && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Power:</span>
                    <span className="font-medium text-slate-800">{product.specifications.powerSource}</span>
                  </div>
                )}
              </div>

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1 text-xs font-semibold text-slate-800 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToCart}
                  className="py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-2.5 px-3 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Order & Compare links */}
              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                <button
                  onClick={() => sendWhatsAppOrder(product, quantity)}
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer py-1"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Order on WhatsApp</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className="flex items-center gap-1 text-slate-600 hover:text-teal-800 cursor-pointer py-1"
                >
                  <Scale className="w-4 h-4 text-slate-400" />
                  <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    viewProduct(product);
                  }}
                  className="text-teal-700 hover:underline font-semibold"
                >
                  Full Details & Reviews →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
