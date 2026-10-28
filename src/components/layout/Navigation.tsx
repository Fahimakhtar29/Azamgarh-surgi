import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Tag, Sparkles, Shield, ChevronDown } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeView, setActiveView, viewCategory, viewBrand } = useStore();

  return (
    <nav className="bg-white border-b border-slate-200 hidden lg:block sticky top-[69px] z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-700 overflow-x-auto py-2 scrollbar-none">
          <li>
            <button
              onClick={() => setActiveView('home')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'bg-[#F57C00] text-white shadow-xs'
                  : 'hover:text-[#E65100] hover:bg-orange-50'
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
                  ? 'bg-[#F57C00] text-white shadow-xs'
                  : 'hover:text-[#E65100] hover:bg-orange-50'
              }`}
            >
              Medical Devices
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('glucometers')}
              className="px-3 py-1.5 rounded-md hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Diabetes Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('bp-monitors')}
              className="px-3 py-1.5 rounded-md hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Heart & BP Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('nebulizers')}
              className="px-3 py-1.5 rounded-md hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Respiratory Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('orthopedic-supports')}
              className="px-3 py-1.5 rounded-md hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Orthopedic Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('weighing-scales')}
              className="px-3 py-1.5 rounded-md hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Personal Care
            </button>
          </li>

          <li>
            <button
              onClick={() => viewCategory('walking-aids')}
              className="px-3 py-1.5 rounded-md hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              Elderly Care
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveView('brands')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeView === 'brands'
                  ? 'bg-[#F57C00] text-white shadow-xs'
                  : 'hover:text-[#E65100] hover:bg-orange-50'
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
                  ? 'bg-[#E65100] text-white shadow-xs ring-1 ring-orange-400'
                  : 'text-[#E65100] bg-orange-50 hover:bg-orange-100 hover:text-[#E65100] border border-orange-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F57C00] animate-pulse" />
              <span>AI Health Hub</span>
            </button>
          </li>

          {/* Right link for store administration */}
          <li className="ml-auto">
            <button
              onClick={() => setActiveView('admin')}
              className={`text-[11px] font-medium px-2.5 py-1 rounded text-slate-500 hover:text-[#E65100] hover:bg-orange-50 transition-colors cursor-pointer ${
                activeView === 'admin' ? 'bg-[#0F172A] text-white' : ''
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
