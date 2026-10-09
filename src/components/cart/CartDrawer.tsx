import React, { useState } from 'react';
import {
  X,
  Trash2,
  Bookmark,
  ArrowRight,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Check,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    saveForLater,
    savedForLater,
    moveToCartFromSaved,
    removeSavedItem,
    cartSubtotal,
    cartMrpTotal,
    cartSavings,
    shippingFee,
    cartTotal,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    setActiveView
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const result = applyCoupon(couponInput);
    setCouponMsg({ success: result.success, text: result.message });
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    setActiveView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-teal-800" />
            <h2 className="text-base font-bold text-slate-900 font-display">
              Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 text-xs">
          {cartSubtotal >= brandConfig.freeShippingThreshold ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You've unlocked Free Express Delivery!</span>
            </div>
          ) : (
            <div>
              <span className="text-slate-600">
                Add items worth{' '}
                <strong className="text-slate-900 font-mono">
                  ₹{(brandConfig.freeShippingThreshold - cartSubtotal).toLocaleString('en-IN')}
                </strong>{' '}
                more for Free Delivery.
              </span>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-teal-700 h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (cartSubtotal / brandConfig.freeShippingThreshold) * 100
                    )}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                <div className="w-20 h-20 rounded-lg bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                  <ImageWithFallback
                    src={item.product.images[0]}
                    alt={item.product.name}
                    category={item.product.category}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                      {item.product.brand}
                    </span>
                    <h3 className="text-xs font-semibold text-slate-900 line-clamp-1 leading-snug">
                      {item.product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                        ₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.product.mrp > item.product.sellingPrice && (
                        <span className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                          ₹{(item.product.mrp * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-300 rounded-md overflow-hidden">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold font-mono text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2 py-0.5 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <button
                        onClick={() => saveForLater(item.product.id)}
                        className="hover:text-teal-800 flex items-center gap-0.5 cursor-pointer text-[11px]"
                        title="Save for Later"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                      <span>·</span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">Your Cart is Empty</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore blood pressure monitors, glucometers, and healthcare essentials.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActiveView('category');
                }}
                className="mt-2 px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold"
              >
                Start Shopping
              </button>
            </div>
          )}

          {/* Saved for Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Saved for Later ({savedForLater.length})
              </h4>
              <div className="space-y-2">
                {savedForLater.map((saved) => (
                  <div
                    key={saved.product.id}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="truncate mr-2">
                      <span className="font-semibold text-slate-800 truncate block">
                        {saved.product.name}
                      </span>
                      <span className="font-mono text-slate-600 font-bold">
                        ₹{saved.product.sellingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => moveToCartFromSaved(saved.product.id)}
                        className="text-teal-800 font-bold hover:underline"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeSavedItem(saved.product.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Coupons & Totals */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 space-y-3.5">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponMsg(null);
                  }}
                  placeholder="Coupon code (e.g. WELCOME10, MEDI50)"
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs uppercase font-mono tracking-wider outline-none focus:border-teal-700"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 p-2 rounded-md border border-emerald-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <Tag className="w-3 h-3" />
                    {appliedCoupon.code} applied (-₹{couponDiscount})
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-rose-600 text-[11px] font-bold hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponMsg && !appliedCoupon && (
                <div
                  className={`text-[11px] p-1.5 rounded flex items-center gap-1 ${
                    couponMsg.success ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {!couponMsg.success && <AlertCircle className="w-3 h-3 shrink-0" />}
                  <span>{couponMsg.text}</span>
                </div>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-mono text-slate-800">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {cartSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Product Savings:</span>
                  <span className="font-mono">-₹{cartSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="font-mono">
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="font-mono text-base text-teal-900">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Primary Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
