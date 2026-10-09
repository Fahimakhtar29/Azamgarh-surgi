import React from 'react';
import { Home, Grid, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { activeView, setActiveView, cartItemCount, wishlist, viewCategory, setIsCartDrawerOpen } =
    useStore();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveView('home')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 text-[11px] font-medium transition-colors cursor-pointer ${
            activeView === 'home' ? 'text-teal-800 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => viewCategory('all')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 text-[11px] font-medium transition-colors cursor-pointer ${
            activeView === 'category' ? 'text-teal-800 font-bold' : 'text-slate-500'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span>Shop</span>
        </button>

        {/* AI Health Hub */}
        <button
          onClick={() => setActiveView('ai-hub')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 text-[11px] font-medium transition-colors cursor-pointer ${
            activeView === 'ai-hub' ? 'text-teal-800 font-bold' : 'text-teal-700'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 mb-0.5 text-teal-600 animate-pulse" />
          </div>
          <span className="font-semibold text-teal-800">AI Hub</span>
        </button>

        {/* Wishlist / Account */}
        <button
          onClick={() => setActiveView('account')}
          className={`relative flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 text-[11px] font-medium transition-colors cursor-pointer ${
            activeView === 'account' ? 'text-teal-800' : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white rounded-full w-3.5 h-3.5 text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span>Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[48px] py-1 text-[11px] font-medium text-slate-700 transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-teal-800" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-500 text-white rounded-full w-4 h-4 text-[10px] font-bold flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="font-semibold text-teal-900">Cart</span>
        </button>
      </div>
    </div>
  );
};
