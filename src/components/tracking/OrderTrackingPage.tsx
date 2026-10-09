import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus, Order } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const OrderTrackingPage: React.FC = () => {
  const { orders, getOrderById } = useStore();

  const [orderInput, setOrderInput] = useState('AMS-90421');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(() => {
    return orders.length > 0 ? orders[0] : null;
  });
  const [errorMsg, setErrorMsg] = useState('');

  const statusSteps: OrderStatus[] = [
    'Order Placed',
    'Confirmed',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) {
      setErrorMsg('Please enter an Order ID');
      return;
    }
    const found = getOrderById(orderInput.trim());
    if (found) {
      setSearchedOrder(found);
      setErrorMsg('');
    } else {
      setErrorMsg(
        `Order "${orderInput}" not found. Please verify your order number (e.g. AMS-90421).`
      );
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Live Consignment Status
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
            Track Your Healthcare Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Enter your Order ID and contact number to view real-time medical cargo dispatch updates.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs mb-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Order ID / Reference Number *
                </label>
                <input
                  type="text"
                  value={orderInput}
                  onChange={(e) => {
                    setOrderInput(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="e.g. AMS-90421"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold outline-none focus:border-teal-700 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono outline-none focus:border-teal-700"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-700 rounded-lg text-xs flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Track Consignment</span>
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results Card */}
        {searchedOrder && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
            {/* Top Info Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  Order Reference: {searchedOrder.orderNumber}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  Status: <span className="text-teal-700">{searchedOrder.status}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Estimated Delivery:{' '}
                  <strong className="text-slate-800 font-medium">
                    {searchedOrder.estimatedDeliveryDate}
                  </strong>
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-left sm:text-right">
                <span className="block text-slate-400 text-[11px]">Courier Partner</span>
                <span className="font-bold text-slate-800 block">{searchedOrder.courierName}</span>
                <span className="font-mono text-slate-500 text-[11px]">
                  AWB: {searchedOrder.trackingNumber}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar (Desktop & Mobile) */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-6">
                Shipment Progression
              </h3>

              <div className="relative">
                {/* Connecting track line */}
                <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                  <div
                    className="h-full bg-teal-700 transition-all duration-500"
                    style={{
                      width: `${(getStepIndex(searchedOrder.status) / (statusSteps.length - 1)) * 100}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = getStepIndex(searchedOrder.status) >= idx;
                    const isCurrent = searchedOrder.status === step;
                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center text-center p-2 rounded-lg bg-white sm:bg-transparent"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-2 transition-all shadow-xs ${
                            isCurrent
                              ? 'bg-teal-700 text-white ring-4 ring-teal-100 scale-110'
                              : isCompleted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs font-semibold leading-tight ${
                            isCurrent
                              ? 'text-teal-900 font-bold'
                              : isCompleted
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Timeline Events */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Activity Log
              </h3>
              <div className="space-y-3">
                {searchedOrder.statusTimeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  >
                    <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{item.status}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items in this consignment */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Consignment Items ({searchedOrder.items.length})
              </h3>
              <div className="space-y-3">
                {searchedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 text-xs"
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 truncate">
                      <span className="font-bold text-teal-800 uppercase text-[10px] block">
                        {item.brand}
                      </span>
                      <span className="font-semibold text-slate-900 truncate block">
                        {item.productName}
                      </span>
                      <span className="text-slate-500">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support helpline footer */}
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-200 text-xs text-teal-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  Questions about your consignment delivery? Contact Azamgarh logistics desk at{' '}
                  <strong>+91 94520 89211</strong>.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
