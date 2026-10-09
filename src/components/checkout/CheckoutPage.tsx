import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  ArrowRight,
  ChevronLeft,
  Lock,
  Package,
  Building,
  Phone
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { CustomerAddress, Order } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    couponDiscount,
    shippingFee,
    cartTotal,
    customerAddress,
    updateCustomerAddress,
    createOrder,
    setActiveView
  } = useStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Step 1: Address state
  const [formData, setFormData] = useState<CustomerAddress>(customerAddress);
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});

  // Step 2: Delivery method
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');

  // Step 3: Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [selectedUPIApp, setSelectedUPIApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiIdInput, setUpiIdInput] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  const indianStates = [
    'Uttar Pradesh',
    'Delhi',
    'Maharashtra',
    'Bihar',
    'West Bengal',
    'Karnataka',
    'Tamil Nadu',
    'Gujarat',
    'Rajasthan',
    'Madhya Pradesh',
    'Punjab',
    'Haryana',
    'Kerala',
    'Telangana',
    'Andhra Pradesh',
    'Uttarakhand',
    'Jharkhand',
    'Assam',
    'Odisha'
  ];

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (addressErrors[name]) {
      setAddressErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddress = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      errors.mobile = 'Valid 10-digit mobile number required';
    }
    if (!formData.houseFlat.trim()) errors.houseFlat = 'House / Flat number is required';
    if (!formData.street.trim()) errors.street = 'Street or Road is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      errors.pincode = 'Valid 6-digit PIN code required';
    }
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      updateCustomerAddress(formData);
      setCurrentStep(2);
    }
  };

  const effectiveShipping =
    deliveryOption === 'express'
      ? brandConfig.expressShippingFee
      : shippingFee;

  const finalTotal = cartSubtotal - couponDiscount + effectiveShipping;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        items: cart,
        shippingAddress: formData,
        paymentMethod: paymentMethod === 'COD' ? 'COD' : paymentMethod,
        shippingFee: effectiveShipping
      });
      setPlacedOrder(order);
      setIsProcessing(false);
    }, 1200);
  };

  // Order Confirmed State
  if (placedOrder) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                Order Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
                Thank You for Your Order!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We've received your medical equipment order. A confirmation SMS and WhatsApp alert will be sent to {placedOrder.shippingAddress.mobile}.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Order Reference:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {placedOrder.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-semibold text-teal-800">
                  {placedOrder.estimatedDeliveryDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-semibold text-slate-800">
                  {placedOrder.paymentMethod} ({placedOrder.paymentStatus})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-medium text-slate-800 text-right max-w-xs">
                  {placedOrder.shippingAddress.houseFlat}, {placedOrder.shippingAddress.street},{' '}
                  {placedOrder.shippingAddress.city} – {placedOrder.shippingAddress.pincode}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-teal-900">
                  ₹{placedOrder.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setActiveView('track-order')}
                className="flex-1 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
              >
                Track This Order Live
              </button>
              <button
                onClick={() => setActiveView('home')}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no order placed
  if (cart.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 text-center">
        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('category')}
          className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-xs font-bold cursor-pointer"
        >
          Browse Healthcare Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              Secure Medical Checkout
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              100% SSL Encrypted · Tamper-proof dispatch from Azamgarh
            </p>
          </div>
          <button
            onClick={() => setActiveView('category')}
            className="text-xs text-teal-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </button>
        </div>

        {/* 3 Steps Progress Bar */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto">
          <div
            className={`flex items-center gap-2 text-xs font-bold ${
              currentStep >= 1 ? 'text-teal-900' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                currentStep >= 1 ? 'bg-teal-800 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              1
            </div>
            <span>Delivery Address</span>
          </div>

          <div
            className={`h-0.5 flex-1 mx-3 ${
              currentStep >= 2 ? 'bg-teal-700' : 'bg-slate-200'
            }`}
          />

          <div
            className={`flex items-center gap-2 text-xs font-bold ${
              currentStep >= 2 ? 'text-teal-900' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                currentStep >= 2 ? 'bg-teal-800 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </div>
            <span>Delivery Method</span>
          </div>

          <div
            className={`h-0.5 flex-1 mx-3 ${
              currentStep >= 3 ? 'bg-teal-700' : 'bg-slate-200'
            }`}
          />

          <div
            className={`flex items-center gap-2 text-xs font-bold ${
              currentStep >= 3 ? 'text-teal-900' : 'text-slate-400'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                currentStep >= 3 ? 'bg-teal-800 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </div>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Step Content */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs">
            {/* STEP 1: Address Form */}
            {currentStep === 1 && (
              <form onSubmit={handleProceedToDelivery} className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <MapPin className="w-5 h-5 text-teal-700" />
                  <h2 className="text-base font-bold text-slate-900">
                    Step 1: Enter Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleAddressChange}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700"
                    />
                    {addressErrors.fullName && (
                      <span className="text-[11px] text-rose-600 block mt-0.5">
                        {addressErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (for delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleAddressChange}
                      placeholder="10-digit mobile (e.g. 9876543210)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono outline-none focus:border-teal-700"
                    />
                    {addressErrors.mobile && (
                      <span className="text-[11px] text-rose-600 block mt-0.5">
                        {addressErrors.mobile}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      House / Flat / Building *
                    </label>
                    <input
                      type="text"
                      name="houseFlat"
                      value={formData.houseFlat}
                      onChange={handleAddressChange}
                      placeholder="e.g. Flat 301, Shivam Complex"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700"
                    />
                    {addressErrors.houseFlat && (
                      <span className="text-[11px] text-rose-600 block mt-0.5">
                        {addressErrors.houseFlat}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street / Road *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleAddressChange}
                      placeholder="e.g. Hospital Road, Civil Lines"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700"
                    />
                    {addressErrors.street && (
                      <span className="text-[11px] text-rose-600 block mt-0.5">
                        {addressErrors.street}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleAddressChange}
                      placeholder="e.g. Azamgarh"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700"
                    />
                    {addressErrors.city && (
                      <span className="text-[11px] text-rose-600 block mt-0.5">
                        {addressErrors.city}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700 bg-white"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleAddressChange}
                      placeholder="6-digit PIN (e.g. 276001)"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono outline-none focus:border-teal-700"
                    />
                    {addressErrors.pincode && (
                      <span className="text-[11px] text-rose-600 block mt-0.5">
                        {addressErrors.pincode}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark || ''}
                      onChange={handleAddressChange}
                      placeholder="Near District Hospital Gate 2"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Continue to Delivery Method</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Delivery Method */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-teal-700" />
                    <h2 className="text-base font-bold text-slate-900">
                      Step 2: Choose Delivery Method
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-teal-700 hover:underline"
                  >
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setDeliveryOption('standard')}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      deliveryOption === 'standard'
                        ? 'border-teal-700 bg-teal-50/50 ring-1 ring-teal-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="mt-1 text-teal-700"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          Standard Express Medical Courier
                        </span>
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Estimated arrival: 2–4 business days via Delhivery / Blue Dart.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryOption('express')}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      deliveryOption === 'express'
                        ? 'border-teal-700 bg-teal-50/50 ring-1 ring-teal-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="mt-1 text-teal-700"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">
                          Priority 24-Hr Medical Dispatch
                        </span>
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          ₹{brandConfig.expressShippingFee}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Same-day dispatch from Azamgarh with priority air cargo handling.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-teal-700" />
                    <h2 className="text-base font-bold text-slate-900">
                      Step 3: Select Payment Method
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    100% Secure Transaction
                  </span>
                </div>

                <div className="space-y-3">
                  {/* UPI Option */}
                  <div
                    className={`p-4 rounded-xl border transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
                        : 'border-slate-200'
                    }`}
                  >
                    <label
                      onClick={() => setPaymentMethod('UPI')}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'UPI'}
                          onChange={() => setPaymentMethod('UPI')}
                          className="text-teal-700"
                        />
                        <span className="font-bold text-sm text-slate-900">
                          Instant UPI (GPay, PhonePe, Paytm, BHIM)
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Fastest & Zero Fees
                      </span>
                    </label>

                    {paymentMethod === 'UPI' && (
                      <div className="mt-4 pt-3 border-t border-teal-200/80 space-y-3 text-xs">
                        <div className="flex gap-2">
                          {['gpay', 'phonepe', 'paytm'].map((app) => (
                            <button
                              key={app}
                              type="button"
                              onClick={() => setSelectedUPIApp(app as any)}
                              className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold capitalize cursor-pointer ${
                                selectedUPIApp === app
                                  ? 'bg-teal-800 text-white border-teal-800'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {app === 'gpay'
                                ? 'Google Pay'
                                : app === 'phonepe'
                                ? 'PhonePe'
                                : 'Paytm UPI'}
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Enter UPI ID / VPA
                          </label>
                          <input
                            type="text"
                            value={upiIdInput}
                            onChange={(e) => setUpiIdInput(e.target.value)}
                            placeholder="username@okhdfcbank"
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono outline-none focus:border-teal-700"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cards */}
                  <div
                    className={`p-4 rounded-xl border transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
                        : 'border-slate-200'
                    }`}
                  >
                    <label
                      onClick={() => setPaymentMethod('Card')}
                      className="flex items-center gap-2.5 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="text-teal-700"
                      />
                      <span className="font-bold text-sm text-slate-900">
                        Credit / Debit Card (Visa, Mastercard, RuPay)
                      </span>
                    </label>

                    {paymentMethod === 'Card' && (
                      <div className="mt-4 pt-3 border-t border-teal-200/80 space-y-3 text-xs max-w-sm">
                        <input
                          type="text"
                          placeholder="Card Number (Demo Sandbox)"
                          defaultValue="4532 ···· ···· 8921"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            defaultValue="08/28"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            defaultValue="482"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    className={`p-4 rounded-xl border transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
                        : 'border-slate-200'
                    }`}
                  >
                    <label
                      onClick={() => setPaymentMethod('COD')}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                          className="text-teal-700"
                        />
                        <span className="font-bold text-sm text-slate-900">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">Pay cash/UPI at doorstep</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                  >
                    ← Back to Delivery
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Verifying & Placing Order...</span>
                    ) : (
                      <>
                        <span>Confirm & Place Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-2.5 text-xs">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 truncate">
                    <span className="font-semibold text-slate-800 truncate block">
                      {item.product.name}
                    </span>
                    <span className="text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono text-slate-900 font-semibold shrink-0">
                    ₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-mono">
                  {effectiveShipping === 0 ? (
                    <strong className="text-emerald-700">FREE</strong>
                  ) : (
                    `₹${effectiveShipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Payable Amount:</span>
                <span className="font-mono text-teal-900 text-base">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Includes GST tax invoice and manufacturer warranty card.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
