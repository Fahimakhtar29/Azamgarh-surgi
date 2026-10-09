import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Tag, Sparkles, Shield, ChevronDown } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeView, setActiveView, viewCategory, viewBrand } = useStore();

  return (
    <nav className="bg-slate-50 border-b border-slate-200 hidden lg:block sticky top-[69px] z-30 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-700 overflow-x-auto py-2 scrollbar-none">
          <li>
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'hover:text-teal-800 hover:bg-slate-200/60'
              }`}
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeView === 'category'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'hover:text-teal-800 hover:bg-slate-200/60'
              }`}
            >
              Medical Devices
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('glucometers')}
              className="px-3 py-1.5 rounded-md hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Diabetes Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('bp-monitors')}
              className="px-3 py-1.5 rounded-md hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Heart & BP Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('nebulizers')}
              className="px-3 py-1.5 rounded-md hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Respiratory Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('orthopedic-supports')}
              className="px-3 py-1.5 rounded-md hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Orthopedic Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('weighing-scales')}
              className="px-3 py-1.5 rounded-md hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Personal Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('walking-aids')}
              className="px-3 py-1.5 rounded-md hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Elderly Care
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveView('brands')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeView === 'brands'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'hover:text-teal-800 hover:bg-slate-200/60'
              }`}
            >
              Brands
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveView('offers')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer font-bold ${
                activeView === 'offers' ? 'bg-rose-600 text-white' : ''
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Offers</span>
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveView('ai-hub')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer font-bold ${
                activeView === 'ai-hub'
                  ? 'bg-teal-900 text-teal-300 shadow-xs ring-1 ring-teal-500'
                  : 'text-teal-800 bg-teal-50 hover:bg-teal-100 hover:text-teal-900 border border-teal-200/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>AI Health Hub</span>
            </button>
          </li>

          {/* Right link for store administration */}
          <li className="ml-auto">
            <button
              onClick={() => setActiveView('admin')}
              className={`text-[11px] font-medium px-2.5 py-1 rounded text-slate-500 hover:text-teal-800 hover:bg-slate-200/60 transition-colors cursor-pointer ${
                activeView === 'admin' ? 'bg-slate-800 text-white' : ''
              }`}
            >
              Store Admin
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
