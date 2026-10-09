import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingBag,
  Scale,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { PincodeModal } from '../common/PincodeModal';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    wishlist,
    compareList,
    currentPincode,
    pincodeCity,
    searchQuery,
    setSearchQuery,
    products,
    viewProduct,
    viewCategory,
    viewBrand,
    setIsCartDrawerOpen
  } = useStore();

  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live smart suggestions
  const getSuggestions = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const suggestions: { label: string; type: 'category' | 'brand' | 'product'; target?: any }[] = [];

    // Predefined synonyms and smart keywords matching prompt requirement
    if ('blood pressure'.includes(q) || 'bp'.includes(q)) {
      suggestions.push({ label: 'BP Monitors (All)', type: 'category', target: 'bp-monitors' });
      suggestions.push({ label: 'Dr. Morepen BP Monitors', type: 'brand', target: 'Dr. Morepen' });
      suggestions.push({ label: 'Omron BP Monitors', type: 'brand', target: 'Omron' });
      suggestions.push({ label: 'Automatic BP Machines', type: 'category', target: 'bp-monitors' });
    }

    if ('sugar'.includes(q) || 'glucometer'.includes(q) || 'diabetes'.includes(q)) {
      suggestions.push({ label: 'Glucometers', type: 'category', target: 'glucometers' });
      suggestions.push({ label: 'Blood Glucose Test Strips', type: 'category', target: 'glucose-strips' });
      suggestions.push({ label: 'Accu-Chek Diabetes Care', type: 'brand', target: 'Accu-Chek' });
    }

    if ('nebulizer'.includes(q) || 'asthma'.includes(q) || 'inhaler'.includes(q)) {
      suggestions.push({ label: 'Compressor Nebulizers', type: 'category', target: 'nebulizers' });
      suggestions.push({ label: 'Omron Nebulizers', type: 'brand', target: 'Omron' });
    }

    if ('oximeter'.includes(q) || 'oxygen'.includes(q) || 'spo2'.includes(q)) {
      suggestions.push({ label: 'Fingertip Pulse Oximeters', type: 'category', target: 'pulse-oximeters' });
      suggestions.push({ label: 'Dr Trust Oximeters', type: 'brand', target: 'Dr Trust' });
    }

    // Matching products
    const matchingProducts = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 4);

    matchingProducts.forEach((p) => {
      suggestions.push({ label: `${p.brand} - ${p.name}`, type: 'product', target: p });
    });

    return suggestions.slice(0, 7);
  };

  const suggestions = getSuggestions();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      setActiveView('category');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* LEFT: Mobile Menu toggle + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-teal-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => {
                setActiveView('home');
                setSearchQuery('');
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-800 text-white flex items-center justify-center shadow-xs group-hover:bg-teal-900 transition-colors">
                <Stethoscope className="w-6 h-6 text-teal-200" />
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold tracking-tight text-teal-950 font-display uppercase leading-tight">
                  {brandConfig.brandName}
                </span>
                <span className="block text-[11px] font-medium text-slate-500 tracking-wide">
                  {brandConfig.tagline}
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Large Search Box with suggestions */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xl mx-2 relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search medicines, devices, brands & healthcare products..."
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-300 focus:border-teal-700 rounded-lg outline-none transition-all placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-16 top-3 text-slate-400 hover:text-slate-600 text-xs font-medium cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-100">
                <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Suggested Results</span>
                  <span>Press Enter to view all</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {suggestions.length > 0 ? (
                    suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsSearchFocused(false);
                          if (item.type === 'category') {
                            viewCategory(item.target);
                          } else if (item.type === 'brand') {
                            viewBrand(item.target);
                          } else if (item.type === 'product') {
                            viewProduct(item.target);
                          }
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          {item.type === 'product' ? (
                            <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                          ) : (
                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className="text-slate-800 group-hover:text-teal-800 font-medium">
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No exact matches. Press Enter to search catalog.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 text-slate-700">
            {/* Location selector */}
            <button
              onClick={() => setIsPincodeModalOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-left transition-colors cursor-pointer"
              title="Change Delivery PIN Code"
            >
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
              <div className="text-xs leading-tight">
                <span className="block text-slate-400 text-[10px]">Deliver to</span>
                <span className="font-semibold text-slate-800">{currentPincode}</span>
              </div>
            </button>

            {/* Comparison */}
            <button
              onClick={() => setActiveView('compare')}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 hover:text-teal-800 cursor-pointer hidden sm:flex items-center"
              title="Compare Products"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveView('account')}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 hover:text-teal-800 cursor-pointer hidden sm:flex items-center"
              title="My Wishlist & Account"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => setActiveView('account')}
              className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700 hover:text-teal-800 cursor-pointer"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline text-xs font-medium">Account</span>
            </button>

            {/* AI Health Hub Trigger */}
            <button
              onClick={() => setActiveView('ai-hub')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-semibold ${
                activeView === 'ai-hub'
                  ? 'bg-teal-900 text-teal-200 border-teal-700 shadow-xs'
                  : 'bg-teal-50 text-teal-800 border-teal-200/80 hover:bg-teal-100 hover:text-teal-900'
              }`}
              title="Azamgarh AI Health Hub (Gemini Chat, Search & Maps Grounding, Image Studio)"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span className="hidden md:inline">AI Health Hub</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg transition-colors cursor-pointer shadow-xs ml-1"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white font-bold rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Visible on mobile screens) */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search BP, glucometer, nebulizer..."
              className="w-full pl-9 pr-14 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-teal-700"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 px-2.5 py-1 bg-teal-700 text-white rounded text-[11px] font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium pb-2 border-b border-slate-100">
              <button
                onClick={() => {
                  setActiveView('ai-hub');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 bg-teal-900 text-teal-200 font-bold rounded-lg text-left col-span-2 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                  Azamgarh AI Health Hub
                </span>
                <span className="text-[10px] bg-teal-800 px-2 py-0.5 rounded text-teal-200">
                  Gemini 3.5 & Nano
                </span>
              </button>
              <button
                onClick={() => {
                  setActiveView('home');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                🏠 Home
              </button>
              <button
                onClick={() => {
                  viewCategory('bp-monitors');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                ❤️ BP Care
              </button>
              <button
                onClick={() => {
                  viewCategory('glucometers');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                🩸 Diabetes Care
              </button>
              <button
                onClick={() => {
                  viewCategory('nebulizers');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                🫁 Respiratory Care
              </button>
              <button
                onClick={() => {
                  viewCategory('orthopedic-supports');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                🦴 Orthopedic
              </button>
              <button
                onClick={() => {
                  setActiveView('offers');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-rose-50 text-rose-700 font-semibold rounded-lg text-left"
              >
                🏷️ Deals & Offers
              </button>
              <button
                onClick={() => {
                  setActiveView('track-order');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                🚚 Track Order
              </button>
              <button
                onClick={() => {
                  setActiveView('compare');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 bg-slate-50 rounded-lg text-slate-800 text-left"
              >
                ⚖️ Compare ({compareList.length})
              </button>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 text-slate-600">
              <span>Location: {currentPincode} ({pincodeCity})</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsPincodeModalOpen(true);
                }}
                className="text-teal-700 font-semibold"
              >
                Change PIN
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Pincode Modal */}
      <PincodeModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
      />
    </>
  );
};
