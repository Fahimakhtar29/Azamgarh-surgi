import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  RotateCcw,
  Search,
  Settings,
  Phone,
  MessageCircle,
  Truck,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { brandConfig } from '../../config/brandConfig';
import { Product, ProductCategory, OrderStatus } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import bpDeviceImg from '../../assets/images/bp_monitor_device_1791454734358.jpg';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    updateOrderStatus,
    setActiveView
  } = useStore();

  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for add/edit product
  const [formProduct, setFormProduct] = useState<Partial<Product>>({
    name: '',
    brand: 'Dr. Morepen',
    category: 'bp-monitors',
    sku: '',
    mrp: 1999,
    sellingPrice: 1299,
    discountPercent: 35,
    stock: 50,
    warranty: '2 Years Manufacturer Warranty',
    description: '',
    shortDescription: '',
    images: [bpDeviceImg],
    rating: 4.7,
    reviewCount: 150,
    specifications: {
      modelNumber: 'AMS-GEN-01',
      displayType: 'Digital LCD Screen',
      powerSource: 'Battery Operated'
    },
    features: ['High precision sensor', 'One-touch operation'],
    tags: ['Medical Device'],
    isFeatured: false,
    isBestSeller: false,
    isOffer: false
  });

  // KPI metrics
  const totalSalesRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStockProducts = products.filter((p) => p.stock < 25);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormProduct({
      name: '',
      brand: 'Dr. Morepen',
      category: 'bp-monitors',
      sku: `AMS-MED-${Math.floor(100 + Math.random() * 900)}`,
      mrp: 1999,
      sellingPrice: 1299,
      discountPercent: 35,
      stock: 50,
      warranty: '2 Years Manufacturer Warranty',
      description: 'Medical grade device manufactured for reliable home healthcare monitoring.',
      shortDescription: 'Certified digital healthcare equipment for family use.',
      images: [bpDeviceImg],
      rating: 4.7,
      reviewCount: 45,
      specifications: {
        modelNumber: 'PRO-2026',
        displayType: 'Backlit LCD',
        accuracy: 'Clinical Grade Standard'
      },
      features: ['Easy to use', 'Accurate readings'],
      tags: ['Diagnostics'],
      isFeatured: false,
      isBestSeller: false,
      isOffer: false
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormProduct(p);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct.name || !formProduct.brand) return;

    const discount = Math.round(
      (((formProduct.mrp || 0) - (formProduct.sellingPrice || 0)) / (formProduct.mrp || 1)) * 100
    );

    const productPayload = {
      ...formProduct,
      discountPercent: Math.max(0, discount),
      slug: (formProduct.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    } as any;

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsAddModalOpen(false);
  };

  const filteredCatalog = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-slate-900 text-teal-400 font-mono text-[11px] font-bold rounded">
                ADMIN ACCESS
              </span>
              <span className="text-xs text-slate-500">{brandConfig.brandName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-1">
              Store Management Console
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('home')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors cursor-pointer"
            >
              Exit to Storefront
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              adminTab === 'overview'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              adminTab === 'products'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              adminTab === 'orders'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setAdminTab('settings')}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              adminTab === 'settings'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Store & WhatsApp Settings
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Sales Volume</span>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  ₹{(totalSalesRevenue + 248500).toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  +18.4% this month across UP & Bihar
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Live Orders Placed</span>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {orders.length + 86}
                </div>
                <span className="text-[11px] text-teal-700 font-semibold">
                  100% Pan-India Dispatches
                </span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Active Medical SKUs</span>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {products.length}
                </div>
                <span className="text-[11px] text-slate-500">14 Active Categories</span>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase">Low Stock Alerts</span>
                <div className="text-2xl font-extrabold text-rose-600 font-mono">
                  {lowStockProducts.length} items
                </div>
                <span className="text-[11px] text-rose-600 font-semibold">
                  Replenishment recommended
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Recent Store Orders
                </h3>
                <button
                  onClick={() => setAdminTab('orders')}
                  className="text-xs text-teal-800 font-semibold hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold font-mono text-slate-900 block">
                        {o.orderNumber} · {o.shippingAddress.fullName}
                      </span>
                      <span className="text-slate-400">
                        {o.items.length} items · {o.shippingAddress.city} · {o.paymentMethod}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold font-mono text-slate-900 block">
                        ₹{o.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded font-semibold text-[10px]">
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS */}
        {adminTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter products by title, brand, or SKU..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:border-teal-700"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetProductsToDefault}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  title="Reload original demo products"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default 50+ Products</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">Product</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Selling Price</th>
                    <th className="p-3">MRP</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCatalog.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60">
                      <td className="p-3 flex items-center gap-2.5 max-w-xs">
                        <ImageWithFallback
                          src={p.images[0]}
                          alt={p.name}
                          category={p.category}
                          className="w-10 h-10 rounded object-cover shrink-0 border border-slate-200"
                        />
                        <div className="truncate">
                          <span className="font-bold text-slate-900 truncate block">
                            {p.name}
                          </span>
                          <span className="text-slate-400 text-[11px]">{p.brand}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono text-slate-600 font-medium">{p.sku}</td>
                      <td className="p-3 text-slate-700 capitalize">{p.category.replace('-', ' ')}</td>
                      <td className="p-3">
                        <span
                          className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            p.stock < 20
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900">
                        ₹{p.sellingPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 font-mono text-slate-400 line-through">
                        ₹{p.mrp.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1 flex-wrap">
                          {p.isBestSeller && (
                            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                              Best Seller
                            </span>
                          )}
                          {p.isFeatured && (
                            <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-slate-600 hover:text-teal-800 rounded hover:bg-slate-100 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {adminTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Orders Dispatch & Fulfillment
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {orders.map((ord) => (
                <div key={ord.id} className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm font-mono text-slate-900 block">
                        {ord.orderNumber}
                      </span>
                      <span className="text-slate-500">
                        Buyer: {ord.shippingAddress.fullName} · {ord.shippingAddress.mobile} · {ord.shippingAddress.city} ({ord.shippingAddress.pincode})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono text-sm text-slate-900">
                        ₹{ord.totalAmount.toLocaleString('en-IN')}
                      </span>

                      {/* Status selector */}
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as OrderStatus)
                        }
                        className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold outline-none focus:border-teal-700 cursor-pointer"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                    <span className="font-bold block mb-1">Products in Order:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {ord.items.map((i, idx) => (
                        <li key={idx}>
                          {i.productName} ({i.brand}) × {i.quantity} @ ₹{i.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {adminTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 max-w-2xl space-y-6">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Store Configuration & Integration Settings
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  disabled
                  value={brandConfig.brandName}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Configured WhatsApp Business Number (for WhatsApp Orders)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value={brandConfig.whatsappNumber}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-700 font-mono"
                  />
                  <a
                    href={`https://wa.me/${brandConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Test</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Free Delivery Threshold (₹)
                  </label>
                  <input
                    type="number"
                    disabled
                    value={brandConfig.freeShippingThreshold}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Standard Shipping Fee (₹)
                  </label>
                  <input
                    type="number"
                    disabled
                    value={brandConfig.standardShippingFee}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Edit Medical Product' : 'Add New Medical Product'}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formProduct.name}
                  onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                  placeholder="e.g. Omron HEM-7120 Blood Pressure Monitor"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand *</label>
                  <select
                    value={formProduct.brand}
                    onChange={(e) => setFormProduct({ ...formProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {BRANDS.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formProduct.category}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        category: e.target.value as ProductCategory
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formProduct.sellingPrice}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, sellingPrice: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formProduct.mrp}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, mrp: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={formProduct.stock}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, stock: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  value={formProduct.images?.[0] || ''}
                  onChange={(e) =>
                    setFormProduct({ ...formProduct, images: [e.target.value] })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formProduct.shortDescription || ''}
                  onChange={(e) =>
                    setFormProduct({ ...formProduct, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Warranty Info
                </label>
                <input
                  type="text"
                  value={formProduct.warranty || ''}
                  onChange={(e) =>
                    setFormProduct({ ...formProduct, warranty: e.target.value })
                  }
                  placeholder="e.g. 2 Years Brand Warranty"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formProduct.isBestSeller}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, isBestSeller: e.target.checked })
                    }
                    className="text-teal-700"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formProduct.isFeatured}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, isFeatured: e.target.checked })
                    }
                    className="text-teal-700"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-800 text-white rounded-lg font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
