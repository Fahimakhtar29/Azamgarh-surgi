import React from 'react';
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowUp,
  CreditCard,
  Truck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';

export const Footer: React.FC = () => {
  const { setActiveView, viewCategory } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-20 lg:pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-teal-200" />
              </div>
              <span className="text-base font-bold text-white tracking-tight font-display uppercase">
                {brandConfig.brandName}
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Your trusted partner for home healthcare equipment, diagnostic monitors, diabetes care, respiratory nebulizers, and orthopedic rehabilitation aids across India.
            </p>

            <div className="space-y-1.5 pt-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{brandConfig.address}, {brandConfig.city}, {brandConfig.state} – {brandConfig.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Direct Support: {brandConfig.supportPhoneFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{brandConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{brandConfig.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Column: Shop */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => viewCategory('bp-monitors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blood Pressure Monitors
                </button>
              </li>
              <li>
                <button
                  onClick={() => viewCategory('glucometers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Glucometers & Test Strips
                </button>
              </li>
              <li>
                <button
                  onClick={() => viewCategory('pulse-oximeters')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pulse Oximeters (SpO2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => viewCategory('nebulizers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Compressor Nebulizers
                </button>
              </li>
              <li>
                <button
                  onClick={() => viewCategory('orthopedic-supports')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Orthopedic Knee & Back Belts
                </button>
              </li>
              <li>
                <button
                  onClick={() => viewCategory('combo-kits')}
                  className="hover:text-white transition-colors cursor-pointer text-teal-400 font-semibold"
                >
                  Healthcare Combo Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Customer Service */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Customer Support
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('track-order')}
                  className="hover:text-white transition-colors cursor-pointer text-teal-400 font-medium"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Account & Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('compare')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Compare Specifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('offers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Coupons & Deals
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${brandConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors cursor-pointer text-emerald-400 font-medium"
                >
                  WhatsApp Care Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Compliance & Store Admin */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Store Information
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <span className="text-slate-300">GST Registration:</span>
                <span className="block font-mono text-slate-400">09AAICA8492K1Z8</span>
              </li>
              <li>
                <span className="text-slate-300">Medical Devices License:</span>
                <span className="block font-mono text-slate-400">MD-REG-UP-276001</span>
              </li>
              <li>
                <span className="text-slate-300">Pan-India Dispatch Hub:</span>
                <span className="block text-slate-400">Azamgarh Logistics Central</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setActiveView('admin')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded border border-slate-700 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer (Prompt #36 & #51) */}
        <div className="my-8 p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-xs">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>MANDATORY MEDICAL & COMPLIANCE DISCLAIMER</span>
          </div>
          <p>
            {brandConfig.medicalDisclaimer}
          </p>
          <p className="text-[11px] text-slate-500">
            <strong>Compliance Note:</strong> This website is an online retailer for home medical devices, health monitoring equipment, and personal healthcare accessories. It does not sell, advertise, or dispense scheduled prescription pharmaceuticals. Do not use readings from home health equipment to alter medical dosages or self-treat serious conditions without direct physician oversight.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {brandConfig.brandName}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>UPI Supported</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>100% SSL Encrypted</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
