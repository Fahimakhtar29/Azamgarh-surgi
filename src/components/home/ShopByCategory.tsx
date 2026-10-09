import React, { useState } from 'react';
import {
  Activity,
  Droplet,
  Layers,
  HeartPulse,
  Wind,
  Thermometer,
  Scale,
  Airplay,
  ShieldAlert,
  Accessibility,
  Compass,
  Cross,
  Zap,
  Headphones,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useStore } from '../../context/StoreContext';
import { ProductCategory } from '../../types';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Activity,
  Droplet,
  Layers,
  HeartPulse,
  Wind,
  Thermometer,
  Scale,
  Airplay,
  ShieldAlert,
  Accessibility,
  Compass,
  Cross,
  Zap,
  Headphones
};

export const ShopByCategory: React.FC = () => {
  const { viewCategory, language } = useStore();
  const [showAll, setShowAll] = useState(false);

  const displayedCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, 8);

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Explore Our Healthcare Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display mt-1">
              Shop by Medical Category
            </h2>
          </div>
          <button
            onClick={() => viewCategory('all')}
            className="text-sm font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1.5 cursor-pointer group self-start sm:self-auto"
          >
            <span>View All Equipment</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {displayedCategories.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || Activity;
            return (
              <div
                key={cat.id}
                onClick={() => viewCategory(cat.id as ProductCategory)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    viewCategory(cat.id as ProductCategory);
                  }
                }}
                className="group bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-teal-500/70 hover:shadow-lg transition-all duration-200 flex flex-col justify-between text-left cursor-pointer h-full"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 ${cat.colorBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                    {language === 'hi' ? cat.hindiName : cat.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {cat.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-teal-700 group-hover:text-teal-800 flex items-center gap-1.5">
                    <span>Shop Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-xs font-medium text-slate-400 font-mono">
                    {cat.count}+ items
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {CATEGORIES.length > 8 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-teal-600 hover:text-teal-800 transition-colors shadow-sm cursor-pointer"
            >
              <span>{showAll ? 'Show Fewer Categories' : `View All ${CATEGORIES.length} Categories`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
