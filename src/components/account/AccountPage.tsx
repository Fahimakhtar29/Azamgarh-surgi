import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Bell,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const AccountPage: React.FC = () => {
  const {
    customerAddress,
    updateCustomerAddress,
    orders,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setActiveView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('orders');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addrForm, setAddrForm] = useState(customerAddress);

  // Filter wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerAddress(addrForm);
    setIsEditingAddress(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Customer Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-0.5">
            My Account & Purchases
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center text-lg shadow-xs">
                {customerAddress.fullName.charAt(0)}
              </div>
              <div className="truncate">
                <h3 className="font-bold text-sm text-slate-900 truncate">
                  {customerAddress.fullName}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  +91 {customerAddress.mobile}
                </span>
              </div>
            </div>

            {/* Menu Buttons */}
            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>My Orders ({orders.length})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'wishlist'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>My Wishlist ({wishlist.length})</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Personal Details</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </nav>
          </div>

          {/* Tab Content Right */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Order History ({orders.length})
                  </h2>
                  <span className="text-xs text-slate-500">All India Dispatches</span>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 text-xs">
                          <div>
                            <span className="font-bold text-slate-900 font-mono text-sm block">
                              {ord.orderNumber}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 bg-teal-100 text-teal-800 font-bold rounded text-[11px]">
                              {ord.status}
                            </span>
                            <span className="font-mono font-bold text-slate-900 text-sm">
                              ₹{ord.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Order items */}
                        <div className="space-y-2">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-lg border border-slate-100">
                              <ImageWithFallback
                                src={item.productImage}
                                alt={item.productName}
                                className="w-12 h-12 rounded object-cover border border-slate-200"
                              />
                              <div className="flex-1 truncate">
                                <span className="font-semibold text-slate-800 block truncate">
                                  {item.productName}
                                </span>
                                <span className="text-slate-400">Qty: {item.quantity} · {item.brand}</span>
                              </div>
                              <span className="font-mono font-bold text-slate-800">
                                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order action footer */}
                        <div className="flex items-center justify-between pt-2 text-xs">
                          <button
                            onClick={() => setActiveView('track-order')}
                            className="text-teal-800 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Track Consignment</span>
                          </button>

                          <button
                            onClick={() => {
                              const prod = products.find((p) => p.id === ord.items[0]?.productId);
                              if (prod) addToCart(prod, 1);
                            }}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Reorder Items
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    You haven't placed any medical orders yet.
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Saved Medical Devices ({wishlistProducts.length})
                  </h2>
                </div>

                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white flex gap-3 text-xs"
                      >
                        <div className="w-20 h-20 rounded-lg bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                          <ImageWithFallback
                            src={p.images[0]}
                            alt={p.name}
                            category={p.category}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="font-bold text-teal-800 text-[10px] uppercase">
                              {p.brand}
                            </span>
                            <h4 className="font-semibold text-slate-900 line-clamp-1">
                              {p.name}
                            </h4>
                            <span className="font-mono font-bold text-slate-900">
                              ₹{p.sellingPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <button
                              onClick={() => {
                                addToCart(p, 1);
                                toggleWishlist(p.id);
                              }}
                              className="px-2.5 py-1 bg-teal-800 hover:bg-teal-900 text-white rounded text-[11px] font-semibold cursor-pointer"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    Your wishlist is currently empty.
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 font-display">
                    Primary Delivery Address
                  </h2>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
                  >
                    {isEditingAddress ? 'Cancel' : 'Edit Address'}
                  </button>
                </div>

                {!isEditingAddress ? (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        {customerAddress.fullName}
                      </span>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-semibold text-[10px]">
                        {customerAddress.addressType} (Default)
                      </span>
                    </div>
                    <p className="text-slate-600">
                      {customerAddress.houseFlat}, {customerAddress.street}, {customerAddress.area}
                    </p>
                    <p className="text-slate-600">
                      {customerAddress.city}, {customerAddress.state} – {customerAddress.pincode}
                    </p>
                    {customerAddress.landmark && (
                      <p className="text-slate-500 italic">
                        Landmark: {customerAddress.landmark}
                      </p>
                    )}
                    <p className="font-mono text-slate-700 pt-1">
                      Mobile: +91 {customerAddress.mobile}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={addrForm.fullName}
                        onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Mobile
                        </label>
                        <input
                          type="text"
                          value={addrForm.mobile}
                          onChange={(e) => setAddrForm({ ...addrForm, mobile: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          value={addrForm.pincode}
                          onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Flat / House / Street
                      </label>
                      <input
                        type="text"
                        value={addrForm.houseFlat}
                        onChange={(e) => setAddrForm({ ...addrForm, houseFlat: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">City</label>
                        <input
                          type="text"
                          value={addrForm.city}
                          onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">State</label>
                        <input
                          type="text"
                          value={addrForm.state}
                          onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-teal-800 text-white rounded-lg font-bold"
                    >
                      Save Address
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-4 text-xs">
                <h2 className="text-base font-bold text-slate-900 font-display pb-3 border-b border-slate-100">
                  Account Preferences
                </h2>
                <div className="space-y-2 text-slate-600">
                  <p>
                    <strong>Email:</strong> care@azamgarhmedical.in (Linked to order notifications)
                  </p>
                  <p>
                    <strong>Language:</strong> English (Hindi toggle available on top bar)
                  </p>
                  <p>
                    <strong>WhatsApp Updates:</strong> Enabled for order milestones
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
