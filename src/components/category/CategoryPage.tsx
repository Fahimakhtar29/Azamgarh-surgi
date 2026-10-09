import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronRight,
  X,
  RotateCcw,
  Star,
  Check,
  Grid
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BRANDS } from '../../data/brands';
import { CATEGORIES } from '../../data/categories';
import { ProductCard } from '../product/ProductCard';
import { ProductCategory } from '../../types';

export const CategoryPage: React.FC = () => {
  const {
    filteredProducts,
    filterState,
    setFilterState,
    resetFilters,
    selectedCategory,
    viewCategory,
    setActiveView
  } = useStore();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Current category details
  const currentCatInfo = CATEGORIES.find((c) => c.id === filterState.category);
  const categoryTitle =
    filterState.category === 'all'
      ? 'All Medical Devices & Home Healthcare'
      : currentCatInfo?.name || filterState.category.replace('-', ' ');

  const handleBrandToggle = (brandName: string) => {
    setFilterState((prev) => {
      const exists = prev.brands.includes(brandName);
      return {
        ...prev,
        brands: exists
          ? prev.brands.filter((b) => b !== brandName)
          : [...prev.brands, brandName]
      };
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
          <button
            onClick={() => setActiveView('home')}
            className="hover:text-teal-800 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-medium capitalize">{categoryTitle}</span>
        </nav>

        {/* Header with Title and Sort Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display capitalize">
                {categoryTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} certified medical equipment products with Pan-India delivery.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters ({filterState.brands.length > 0 ? filterState.brands.length : ''})</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline">Sort By:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any
                    }))
                  }
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-teal-700 cursor-pointer"
                >
                  <option value="popularity">Popularity / Top Reviews</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {(filterState.brands.length > 0 ||
            filterState.category !== 'all' ||
            filterState.inStockOnly ||
            filterState.minDiscount > 0) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">Active Filters:</span>

              {filterState.category !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 px-2.5 py-1 rounded-md text-xs font-medium border border-teal-200">
                  {categoryTitle}
                  <button
                    onClick={() => viewCategory('all')}
                    className="hover:text-teal-950 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {filterState.brands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 px-2.5 py-1 rounded-md text-xs font-medium border border-teal-200"
                >
                  {b}
                  <button
                    onClick={() => handleBrandToggle(b)}
                    className="hover:text-teal-950 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              <button
                onClick={resetFilters}
                className="text-teal-700 hover:text-teal-900 font-semibold text-xs ml-2 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Layout: Filters Sidebar Left, Product Grid Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-teal-700" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-teal-700 hover:underline font-semibold cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Category selection */}
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Categories
              </h3>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => viewCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filterState.category === 'all'
                      ? 'bg-teal-50 text-teal-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => viewCategory(cat.id as ProductCategory)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-between ${
                      filterState.category === cat.id
                        ? 'bg-teal-50 text-teal-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand filter checkboxes */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Brands
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {BRANDS.map((b) => (
                  <label
                    key={b.id}
                    className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filterState.brands.includes(b.name)}
                      onChange={() => handleBrandToggle(b.name)}
                      className="w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-700 cursor-pointer"
                    />
                    <span>{b.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                <span className="uppercase tracking-wider">Max Price</span>
                <span className="font-mono text-teal-800">
                  ₹{filterState.maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={filterState.maxPrice}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value)
                  }))
                }
                className="w-full accent-teal-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>₹500</span>
                <span>₹10,000</span>
              </div>
            </div>

            {/* Minimum Discount */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Minimum Discount
              </h3>
              <div className="space-y-1.5 text-xs text-slate-700">
                {[0, 20, 30, 40, 50].map((d) => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="discount"
                      checked={filterState.minDiscount === d}
                      onChange={() =>
                        setFilterState((prev) => ({ ...prev, minDiscount: d }))
                      }
                      className="text-teal-700 focus:ring-teal-700 cursor-pointer"
                    />
                    <span>{d === 0 ? 'All Discounts' : `${d}% and above`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterState.inStockOnly}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      inStockOnly: e.target.checked
                    }))
                  }
                  className="w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-700"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Right */}
          <main className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Grid className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  No matching medical devices found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your brand or price filters, or search using another keyword like "BP", "Glucometer", or "Nebulizer".
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-slate-900 text-base">Filters</span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Category
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    viewCategory('all');
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full text-left py-1 text-xs"
                >
                  All Products
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      viewCategory(c.id as ProductCategory);
                      setIsMobileFiltersOpen(false);
                    }}
                    className="w-full text-left py-1 text-xs text-slate-600 truncate"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Brands */}
            <div className="pt-3 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Brands
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {BRANDS.map((b) => (
                  <label key={b.id} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={filterState.brands.includes(b.name)}
                      onChange={() => handleBrandToggle(b.name)}
                      className="text-teal-700 rounded"
                    />
                    <span>{b.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-3 bg-teal-800 text-white rounded-lg text-xs font-bold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
