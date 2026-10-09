import React, { useState } from 'react';
import { MapPin, X, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface PincodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PincodeModal: React.FC<PincodeModalProps> = ({ isOpen, onClose }) => {
  const { currentPincode, checkPincode, setDeliverPincode } = useStore();
  const [pinInput, setPinInput] = useState(currentPincode);
  const [checkResult, setCheckResult] = useState<{
    tested: boolean;
    available: boolean;
    message: string;
    city: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkPincode(pinInput);
    setCheckResult({
      tested: true,
      available: result.available,
      message: result.message,
      city: result.city
    });
    if (result.available) {
      setDeliverPincode(pinInput, result.city);
    }
  };

  const handleSelectPredefined = (pin: string) => {
    setPinInput(pin);
    const result = checkPincode(pin);
    setCheckResult({
      tested: true,
      available: result.available,
      message: result.message,
      city: result.city
    });
    setDeliverPincode(pin, result.city);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-teal-800 font-semibold text-lg">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>Select Delivery Location</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-3 mb-4">
          Enter your 6-digit Indian PIN code to view accurate medical device delivery timelines, shipping options, and local availability.
        </p>

        <form onSubmit={handleCheck} className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ''));
                  setCheckResult(null);
                }}
                placeholder="Enter 6-digit PIN (e.g. 276001)"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono tracking-wider focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Verify
            </button>
          </div>

          {checkResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                checkResult.available
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {checkResult.available ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold">{checkResult.message}</p>
                {checkResult.available && (
                  <p className="text-emerald-700 mt-0.5">
                    Express medical courier dispatched from Azamgarh central fulfillment hub.
                  </p>
                )}
              </div>
            </div>
          )}
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-600 mb-2">Quick Cities:</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: 'Azamgarh (276001)', pin: '276001' },
              { name: 'Varanasi (221001)', pin: '221001' },
              { name: 'Lucknow (226001)', pin: '226001' },
              { name: 'Gorakhpur (273001)', pin: '273001' },
              { name: 'Delhi (110001)', pin: '110001' },
              { name: 'Mumbai (400001)', pin: '400001' }
            ].map((c) => (
              <button
                key={c.pin}
                type="button"
                onClick={() => handleSelectPredefined(c.pin)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                  pinInput === c.pin
                    ? 'border-teal-600 bg-teal-50 text-teal-800 font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Confirm & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
