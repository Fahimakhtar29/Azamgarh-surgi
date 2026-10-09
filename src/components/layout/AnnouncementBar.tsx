import React from 'react';
import { ShieldCheck, Phone, MapPin, Globe } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';

export const AnnouncementBar: React.FC = () => {
  const { currentPincode, pincodeCity, language, toggleLanguage, setActiveView } = useStore();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Free delivery badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Genuine Medical Devices
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300">
            Free Delivery on Orders Above ₹{brandConfig.freeShippingThreshold}
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">Pan-India Express Dispatch</span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-4 text-slate-300">
          <button
            onClick={() => setActiveView('track-order')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Track Order
          </button>

          <span className="text-slate-600">·</span>

          <a
            href={`tel:${brandConfig.phone}`}
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-slate-400" />
            <span>Support: {brandConfig.supportPhoneFormatted}</span>
          </a>

          <span className="hidden sm:inline text-slate-600">·</span>

          <div className="flex items-center gap-1 text-slate-300">
            <MapPin className="w-3 h-3 text-teal-400" />
            <span className="font-medium text-white">{currentPincode}</span>
            <span className="hidden lg:inline text-slate-400">({pincodeCity})</span>
          </div>

          <span className="text-slate-600">·</span>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-teal-300 hover:text-teal-200 transition-colors cursor-pointer font-medium"
            title="Switch language"
          >
            <Globe className="w-3 h-3" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
