import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  Zap,
  MessageCircle,
  Scale,
  Heart,
  ChevronRight,
  MapPin,
  Check,
  AlertCircle,
  FileText,
  HelpCircle,
  Share2,
  Sparkles
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { ProductCard } from './ProductCard';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    currentPincode,
    checkPincode,
    setDeliverPincode,
    sendWhatsAppOrder,
    products,
    setActiveView,
    viewCategory
  } = useStore();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState(currentPincode);
  const [pincodeMsg, setPincodeMsg] = useState<{ checked: boolean; available: boolean; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'howToUse' | 'reviews' | 'warranty'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Check pincode inline
  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkPincode(pincodeInput);
    setPincodeMsg({
      checked: true,
      available: res.available,
      text: res.message
    });
    if (res.available) {
      setDeliverPincode(pincodeInput, res.city);
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
          <button
            onClick={() => setActiveView('home')}
            className="hover:text-teal-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => viewCategory(product.category)}
            className="hover:text-teal-800 transition-colors cursor-pointer capitalize"
          >
            {product.category.replace('-', ' ')}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Grid: Gallery Left, Purchase Module Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* LEFT: Product Image Gallery */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="relative aspect-4/3 sm:aspect-16/10 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center">
              <ImageWithFallback
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                category={product.category}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Deal tag overlay */}
              {product.discountPercent >= 35 && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded shadow-sm">
                  {product.discountPercent}% OFF SPECIAL
                </div>
              )}

              {/* Action buttons on image */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-sm cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-white/90 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 bg-white/90 text-slate-600 hover:text-slate-900 rounded-full border border-slate-200 shadow-sm transition-colors cursor-pointer"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {copiedLink && (
                <div className="absolute bottom-4 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg animate-in fade-in">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImageIdx === idx
                        ? 'border-teal-700 ring-2 ring-teal-100 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      category={product.category}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Micro Guarantees below gallery */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-teal-700 mx-auto mb-1" />
                <span className="font-semibold block text-slate-900">Original Certified</span>
                <span className="text-[11px] text-slate-500">Official Brand Sealed</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Truck className="w-5 h-5 text-teal-700 mx-auto mb-1" />
                <span className="font-semibold block text-slate-900">Fast Regional Dispatch</span>
                <span className="text-[11px] text-slate-500">Same-Day Packing</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <RotateCcw className="w-5 h-5 text-teal-700 mx-auto mb-1" />
                <span className="font-semibold block text-slate-900">7-Day Replacement</span>
                <span className="text-[11px] text-slate-500">For Operational Defects</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Contiguous Purchase Module */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-bold text-teal-800 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-snug">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-2.5 text-xs">
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                </div>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-medium">
                  {product.reviewCount} Verified Buyer Reviews
                </span>
              </div>

              {/* Price & Taxes */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  ₹{product.sellingPrice.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.sellingPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    ₹{product.mrp.toLocaleString('en-IN')} MRP
                  </span>
                )}
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  {product.discountPercent}% OFF
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Inclusive of all taxes (GST) · Free delivery on orders above ₹{brandConfig.freeShippingThreshold}
              </p>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/70">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>In Stock & Ready for Immediate Dispatch ({product.stock} units left)</span>
            </div>

            {/* Pincode Delivery Checker (Prompt #18) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-teal-700" />
                <span>Check Delivery & Cash on Delivery Availability:</span>
              </div>

              <form onSubmit={handlePincodeSubmit} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => {
                    setPincodeInput(e.target.value.replace(/\D/g, ''));
                    setPincodeMsg(null);
                  }}
                  placeholder="Enter 6-digit PIN"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono tracking-wider outline-none focus:border-teal-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Check
                </button>
              </form>

              {pincodeMsg && (
                <div
                  className={`text-xs p-2 rounded-lg flex items-start gap-1.5 ${
                    pincodeMsg.available
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {pincodeMsg.available ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{pincodeMsg.text}</span>
                </div>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-700">Select Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-semibold text-slate-800 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="py-3 px-4 bg-teal-50 hover:bg-teal-100 text-teal-950 border border-teal-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-teal-700" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="py-3 px-4 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* WhatsApp Order Button (Prompt #23) */}
              <button
                onClick={() => sendWhatsAppOrder(product, quantity)}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp (Fast Assistance)</span>
              </button>

              {/* Ask Gemini AI About This Device */}
              <button
                onClick={() => setActiveView('ai-hub')}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-teal-50 to-sky-50 hover:from-teal-100 hover:to-sky-100 text-teal-900 border border-teal-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
                <span>Ask AI Health Assistant About {product.name}</span>
              </button>

              <button
                onClick={() => addToCompare(product)}
                className="w-full py-2 text-xs font-medium text-slate-600 hover:text-teal-800 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isCompared ? 'Already in Comparison List' : 'Compare with Other Devices'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Tabs: Specifications, How to Use, Warranty, Reviews */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Specifications & Features
            </button>
            <button
              onClick={() => setActiveTab('howToUse')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'howToUse'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              How to Use at Home
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'warranty'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Warranty & Shipping Policy
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-teal-800 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Customer Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                    Product Description
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                </div>

                {/* Key Features bullet list */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Key Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Specifications Table */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">
                    Technical Specifications
                  </h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-3 p-3 bg-white even:bg-slate-50/60">
                        <span className="font-semibold text-slate-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="col-span-2 text-slate-800 font-medium">
                          {Array.isArray(val) ? val.join(', ') : String(val)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Usage Instructions & Step-by-Step Guide
                </h3>
                {product.howToUseSteps && product.howToUseSteps.length > 0 ? (
                  <ol className="space-y-3 text-xs text-slate-700">
                    {product.howToUseSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="w-6 h-6 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-xs text-slate-600">
                    Always refer to the manufacturer manual included inside the retail box before operating the equipment. Ensure batteries are placed with correct polarity.
                  </p>
                )}

                <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 mt-4">
                  <strong>Need hands-on help?</strong> Our Azamgarh clinical technicians are available on WhatsApp (+91 94520 89211) to walk you through first-time operation.
                </div>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-4 max-w-2xl text-xs text-slate-700">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Warranty & Dispatch Guarantee
                </h3>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">
                    {product.warranty}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    This unit comes with official manufacturer brand warranty valid across all authorized service centers in India. Keep the retail invoice generated at checkout for warranty registration.
                  </p>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p>
                    <strong>7-Day Replacement Policy:</strong> If the unit experiences operational malfunction or arrives damaged, contact us within 7 days of delivery for a free doorstep replacement.
                  </p>
                  <p>
                    <strong>Pan-India Logistics:</strong> Orders received before 2:00 PM are dispatched on the same business day via insured air/surface cargo with real-time tracking updates.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 min-w-[120px]">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">
                      {product.rating}
                    </span>
                    <div className="flex items-center justify-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">Based on {product.reviewCount} reviews</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">100% Verified Buyers</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Feedback collected from authentic home healthcare buyers across Uttar Pradesh and India.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Dr. M. K. Pandey (Varanasi)</span>
                      <span className="text-slate-400">12 days ago</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600">
                      "Device accuracy matches clinical mercury benchmark closely. Quick delivery and sealed packaging."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 font-display mb-6">
              Customers Also Viewed
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
