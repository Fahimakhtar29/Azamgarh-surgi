import React from 'react';
import { Star, Heart, Eye, ShoppingCart, Zap, CheckCircle2, Scale } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    viewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToCompare,
    isInCompare,
    deliveryDaysEstimate
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Delivery date computation
  const getDeliveryDateText = (days = 2) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    return today.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const deliveryText = getDeliveryDateText(product.deliveryEstimateDays || deliveryDaysEstimate);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCompare(product);
  };

  return (
    <div
      onClick={() => viewProduct(product)}
      className="group bg-white rounded-xl border border-slate-200/90 hover:border-teal-600/50 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative cursor-pointer"
    >
      {/* Top Banner tags / Deal highlights */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.discountPercent >= 35 && (
          <span className="bg-rose-700 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase shadow-xs">
            {product.discountPercent}% OFF
          </span>
        )}
        {product.dealTag && (
          <span className="bg-teal-900 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide shadow-xs">
            {product.dealTag}
          </span>
        )}
      </div>

      {/* Wishlist & Compare triggers */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 hover:bg-white text-slate-400 hover:text-slate-700 border border-slate-200'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        <button
          type="button"
          onClick={handleToggleCompare}
          className={`p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
            isCompared
              ? 'bg-amber-50 text-amber-700 border border-amber-300'
              : 'bg-white/90 hover:bg-white text-slate-400 hover:text-slate-700 border border-slate-200'
          }`}
          title="Compare specifications"
        >
          <Scale className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Image Frame */}
      <div className="relative pt-[85%] bg-slate-50/70 overflow-hidden border-b border-slate-100">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          category={product.category}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-1.5 bg-slate-900/85 hover:bg-slate-900 text-white rounded text-xs font-medium backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand Kicker */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-teal-800 uppercase tracking-wider text-[11px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-slate-400">SKU: {product.sku}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-teal-900 transition-colors">
            {product.name}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[11px]">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
            </div>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 text-[11px]">
              {product.reviewCount} reviews
            </span>
          </div>

          {/* Pricing row with Tabular Figures */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              ₹{product.sellingPrice.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.sellingPrice && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')} MRP
              </span>
            )}
            <span className="text-xs font-semibold text-rose-600">
              {product.discountPercent}% OFF
            </span>
          </div>

          {/* Availability & Delivery Status */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-col gap-1 text-[11px] text-slate-500">
            <div className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>In Stock · Genuine Unit</span>
            </div>
            <div className="text-slate-500">
              Delivery by <span className="font-semibold text-slate-700">{deliveryText}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-full py-2 px-2 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/80 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full py-2 px-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
