import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  SavedItem,
  Order,
  OrderStatus,
  Coupon,
  CustomerAddress,
  ActiveView,
  FilterState,
  ProductCategory
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/products';
import { getProductImages } from '../data/productImages';
import { brandConfig } from '../config/brandConfig';

import bpDeviceImg from '../assets/images/bp_monitor_device_1791454734358.jpg';
import glDeviceImg from '../assets/images/glucometer_device_kit_1791454747005.jpg';

interface PincodeCheckResult {
  available: boolean;
  estimatedDays: number;
  city: string;
  message: string;
}

interface StoreContextType {
  // Navigation & Views
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProduct: Product | null;
  viewProduct: (product: Product) => void;
  selectedCategory: ProductCategory | 'all';
  viewCategory: (category: ProductCategory | 'all') => void;
  selectedBrand: string | null;
  viewBrand: (brandName: string | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Language
  language: 'en' | 'hi';
  toggleLanguage: () => void;

  // Products
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;

  // Filter & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartSubtotal: number;
  cartMrpTotal: number;
  cartSavings: number;
  shippingFee: number;
  cartTotal: number;

  // Save for Later
  savedForLater: SavedItem[];
  saveForLater: (productId: string) => void;
  moveToCartFromSaved: (productId: string) => void;
  removeSavedItem: (productId: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;

  // Compare
  compareList: Product[];
  addToCompare: (product: Product) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Pincode & Delivery
  currentPincode: string;
  pincodeCity: string;
  deliveryDaysEstimate: number;
  checkPincode: (pincode: string) => PincodeCheckResult;
  setDeliverPincode: (pincode: string, city?: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderPayload: {
    items: { product: Product; quantity: number }[];
    shippingAddress: CustomerAddress;
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'COD';
    shippingFee: number;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Customer Profile & Address
  customerAddress: CustomerAddress;
  updateCustomerAddress: (address: Partial<CustomerAddress>) => void;

  // WhatsApp Order
  sendWhatsAppOrder: (product: Product, quantity?: number, customerName?: string) => void;

  // Admin Actions
  addProduct: (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_FILTER: FilterState = {
  searchQuery: '',
  category: 'all',
  brands: [],
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  inStockOnly: false,
  minDiscount: 0,
  sortBy: 'popularity'
};

const DEFAULT_ADDRESS: CustomerAddress = {
  id: 'addr-01',
  fullName: 'Ahmad Fahim',
  mobile: '9452089211',
  houseFlat: 'Flat 402, Al-Madina Heights',
  street: 'Hospital Road',
  area: 'Civil Lines',
  city: 'Azamgarh',
  state: 'Uttar Pradesh',
  pincode: '276001',
  landmark: 'Near District Hospital Gate 2',
  addressType: 'Home',
  isDefault: true
};

const PINCODE_DATABASE: Record<string, { city: string; days: number }> = {
  '276001': { city: 'Azamgarh, UP', days: 1 },
  '276002': { city: 'Azamgarh Rural, UP', days: 1 },
  '221001': { city: 'Varanasi, UP', days: 2 },
  '226001': { city: 'Lucknow, UP', days: 2 },
  '273001': { city: 'Gorakhpur, UP', days: 2 },
  '211001': { city: 'Prayagraj, UP', days: 2 },
  '110001': { city: 'New Delhi, DL', days: 3 },
  '400001': { city: 'Mumbai, MH', days: 4 },
  '560001': { city: 'Bengaluru, KA', days: 4 },
  '700001': { city: 'Kolkata, WB', days: 4 },
  '600001': { city: 'Chennai, TN', days: 4 },
  '500001': { city: 'Hyderabad, TS', days: 4 },
  '302001': { city: 'Jaipur, RJ', days: 3 },
  '380001': { city: 'Ahmedabad, GJ', days: 3 },
  '800001': { city: 'Patna, BR', days: 3 }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Products state (persisted to localStorage with auto-healing for verified images)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ams_products_v7');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 20) {
          // Re-bind latest verified images so old cached duplicates don't linger
          return parsed.map((p: Product) => ({
            ...p,
            images: getProductImages(p.id, p.category, p.images)
          }));
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ams_products_v7', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Filters & Search
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ams_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ams_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Saved for Later
  const [savedForLater, setSavedForLater] = useState<SavedItem[]>(() => {
    try {
      const saved = localStorage.getItem('ams_saved_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ams_saved_items', JSON.stringify(savedForLater));
    } catch (e) {
      console.error('Failed to save saved items', e);
    }
  }, [savedForLater]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ams_wishlist');
      return saved ? JSON.parse(saved) : ['bp-01', 'gl-01'];
    } catch {
      return ['bp-01', 'gl-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ams_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Compare List
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Coupons
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Delivery & Pincode
  const [currentPincode, setCurrentPincode] = useState('276001');
  const [pincodeCity, setPincodeCity] = useState('Azamgarh, UP');
  const [deliveryDaysEstimate, setDeliveryDaysEstimate] = useState(1);

  // Customer Address
  const [customerAddress, setCustomerAddress] = useState<CustomerAddress>(() => {
    try {
      const saved = localStorage.getItem('ams_address');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESS;
    } catch {
      return DEFAULT_ADDRESS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ams_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial sample order for order tracking demonstration
    return [
      {
        id: 'ord-1001',
        orderNumber: 'AMS-90421',
        createdAt: '2026-03-05T14:30:00Z',
        items: [
          {
            productId: 'bp-01',
            productName: 'Dr. Morepen BP-02 Blood Pressure Monitor',
            productImage: bpDeviceImg,
            brand: 'Dr. Morepen',
            quantity: 1,
            price: 1499,
            mrp: 2495
          },
          {
            productId: 'gl-01',
            productName: 'Dr. Morepen BG-03 Glucometer Kit with 10 Strips',
            productImage: glDeviceImg,
            brand: 'Dr. Morepen',
            quantity: 1,
            price: 499,
            mrp: 999
          }
        ],
        subtotal: 1998,
        discount: 100,
        shippingFee: 0,
        totalAmount: 1898,
        appliedCoupon: 'HEALTH100',
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        shippingAddress: DEFAULT_ADDRESS,
        status: 'Out for Delivery',
        statusTimeline: [
          { status: 'Order Placed', timestamp: '05 Mar, 02:30 PM', description: 'Order verified and confirmed via UPI payment' },
          { status: 'Confirmed', timestamp: '05 Mar, 03:00 PM', description: 'Medical device batch inspected and approved' },
          { status: 'Packed', timestamp: '05 Mar, 06:15 PM', description: 'Tamper-proof bubble sealed at Azamgarh Central Facility' },
          { status: 'Shipped', timestamp: '06 Mar, 09:30 AM', description: 'Dispatched via Express Courier' },
          { status: 'Out for Delivery', timestamp: '07 Mar, 08:45 AM', description: 'Courier rider is en route to delivery address' }
        ],
        courierName: 'Delhivery Express Medical Cargo',
        trackingNumber: 'DLV-AMS-9482710',
        estimatedDeliveryDate: 'Today by 6:00 PM'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('ams_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Product helper
  const getProductById = (id: string) => products.find((p) => p.id === id);
  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);

  // View switchers
  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewCategory = (category: ProductCategory | 'all') => {
    setSelectedCategory(category);
    setFilterState((prev) => ({ ...prev, category }));
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewBrand = (brandName: string | null) => {
    setSelectedBrand(brandName);
    if (brandName) {
      setFilterState((prev) => ({ ...prev, brands: [brandName] }));
    } else {
      setFilterState((prev) => ({ ...prev, brands: [] }));
    }
    setActiveView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, addedAt: new Date().toISOString() }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Save for later
  const saveForLater = (productId: string) => {
    const itemToSave = cart.find((item) => item.product.id === productId);
    if (itemToSave) {
      removeFromCart(productId);
      setSavedForLater((prev) => [
        ...prev.filter((i) => i.product.id !== productId),
        { product: itemToSave.product, savedAt: new Date().toISOString() }
      ]);
    }
  };

  const moveToCartFromSaved = (productId: string) => {
    const saved = savedForLater.find((i) => i.product.id === productId);
    if (saved) {
      removeSavedItem(productId);
      addToCart(saved.product, 1);
    }
  };

  const removeSavedItem = (productId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = (productId: string) => {
    const product = getProductById(productId);
    if (product) {
      addToCart(product, 1);
      toggleWishlist(productId);
    }
  };

  // Comparison
  const addToCompare = (product: Product): { success: boolean; message: string } => {
    if (compareList.some((p) => p.id === product.id)) {
      return { success: false, message: 'Product is already in comparison list' };
    }
    if (compareList.length >= 4) {
      return { success: false, message: 'You can compare a maximum of 4 products at a time.' };
    }
    setCompareList((prev) => [...prev, product]);
    return { success: true, message: `Added ${product.brand} ${product.name} to compare.` };
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const isInCompare = (productId: string) => compareList.some((p) => p.id === productId);

  // Cart calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.sellingPrice * item.quantity,
    0
  );
  const cartMrpTotal = cart.reduce(
    (acc, item) => acc + item.product.mrp * item.quantity,
    0
  );
  const cartSavings = cartMrpTotal - cartSubtotal;

  // Coupon calculations
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (cartSubtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountType === 'percentage') {
        const discountAmount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
        couponDiscount = appliedCoupon.maxDiscount
          ? Math.min(discountAmount, appliedCoupon.maxDiscount)
          : discountAmount;
      } else {
        couponDiscount = appliedCoupon.discountValue;
      }
    }
  }

  const shippingFee =
    cartSubtotal >= brandConfig.freeShippingThreshold || cartSubtotal === 0
      ? 0
      : brandConfig.standardShippingFee;

  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try WELCOME10, MEDI50, or HEALTH100' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}. Add items worth ₹${found.minOrderValue - cartSubtotal} more.`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Pincode checking
  const checkPincode = (code: string): PincodeCheckResult => {
    const cleaned = code.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      return {
        available: false,
        estimatedDays: 0,
        city: '',
        message: 'Please enter a valid 6-digit Indian PIN code.'
      };
    }

    if (PINCODE_DATABASE[cleaned]) {
      const data = PINCODE_DATABASE[cleaned];
      return {
        available: true,
        estimatedDays: data.days,
        city: data.city,
        message: `Delivery available in ${data.days} ${data.days === 1 ? 'day' : 'days'} to ${data.city}.`
      };
    }

    // Default pan-India pincode resolution
    return {
      available: true,
      estimatedDays: 3,
      city: 'Standard Pan-India Delivery',
      message: 'Delivery available in 3-5 business days via Express Medical Courier.'
    };
  };

  const setDeliverPincode = (code: string, city?: string) => {
    setCurrentPincode(code);
    if (city) {
      setPincodeCity(city);
    } else {
      const res = checkPincode(code);
      setPincodeCity(res.city || 'Pan-India');
      setDeliveryDaysEstimate(res.estimatedDays || 3);
    }
  };

  // Order creation
  const createOrder = (orderPayload: {
    items: { product: Product; quantity: number }[];
    shippingAddress: CustomerAddress;
    paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'COD';
    shippingFee: number;
  }): Order => {
    const subtotal = orderPayload.items.reduce(
      (acc, item) => acc + item.product.sellingPrice * item.quantity,
      0
    );
    const orderNumber = `AMS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: orderPayload.items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.images[0],
        brand: i.product.brand,
        quantity: i.quantity,
        price: i.product.sellingPrice,
        mrp: i.product.mrp
      })),
      subtotal,
      discount: couponDiscount,
      shippingFee: orderPayload.shippingFee,
      totalAmount: subtotal - couponDiscount + orderPayload.shippingFee,
      appliedCoupon: appliedCoupon?.code,
      paymentMethod: orderPayload.paymentMethod,
      paymentStatus: orderPayload.paymentMethod === 'COD' ? 'COD Authorized' : 'Paid',
      shippingAddress: orderPayload.shippingAddress,
      status: 'Order Placed',
      statusTimeline: [
        {
          status: 'Order Placed',
          timestamp: 'Just now',
          description: `Order successfully placed via ${orderPayload.paymentMethod}`
        }
      ],
      courierName: 'Delhivery Express Medical Cargo',
      trackingNumber: `DLV-${orderNumber}`,
      estimatedDeliveryDate: 'Within 2-3 business days'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) =>
        o.id === orderId ||
        o.orderNumber.toLowerCase() === orderId.toLowerCase() ||
        o.orderNumber.replace('AMS-', '') === orderId.replace('AMS-', '')
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          return {
            ...o,
            status,
            statusTimeline: [
              ...o.statusTimeline,
              {
                status,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                description: `Status updated to ${status}`
              }
            ]
          };
        }
        return o;
      })
    );
  };

  // WhatsApp Order generator
  const sendWhatsAppOrder = (product: Product, quantity = 1, customerName = 'Valued Customer') => {
    const text = encodeURIComponent(
      `Hello ${brandConfig.brandName},\n\nI would like to order the following medical device:\n\n*Product:* ${product.brand} - ${product.name}\n*SKU:* ${product.sku}\n*Quantity:* ${quantity}\n*Price:* ₹${product.sellingPrice * quantity} (MRP ₹${product.mrp * quantity})\n*Customer:* ${customerName}\n*Delivery Pincode:* ${currentPincode}\n\nPlease confirm availability and dispatch schedule.`
    );
    const url = `https://wa.me/${brandConfig.whatsappNumber}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Admin Actions
  const addProduct = (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
    const created: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts((prev) => [created, ...prev]);
    return created;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('ams_products');
    localStorage.removeItem('ams_products_v3');
    localStorage.removeItem('ams_products_v6');
    localStorage.removeItem('ams_products_v7');
  };

  const updateCustomerAddress = (address: Partial<CustomerAddress>) => {
    setCustomerAddress((prev) => {
      const updated = { ...prev, ...address };
      localStorage.setItem('ams_address', JSON.stringify(updated));
      return updated;
    });
  };

  const resetFilters = () => {
    setFilterState(INITIAL_FILTER);
    setSearchQuery('');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  // Filtered Products computation
  const filteredProducts = products.filter((product) => {
    // Search query
    const effectiveQuery = (searchQuery || filterState.searchQuery).toLowerCase().trim();
    if (effectiveQuery) {
      const matchesName = product.name.toLowerCase().includes(effectiveQuery);
      const matchesBrand = product.brand.toLowerCase().includes(effectiveQuery);
      const matchesCategory = product.category.toLowerCase().includes(effectiveQuery);
      const matchesSku = product.sku.toLowerCase().includes(effectiveQuery);
      const matchesTags = product.tags.some((t) => t.toLowerCase().includes(effectiveQuery));
      if (!matchesName && !matchesBrand && !matchesCategory && !matchesSku && !matchesTags) {
        return false;
      }
    }

    // Category filter
    if (filterState.category !== 'all' && product.category !== filterState.category) {
      return false;
    }

    // Brand filter
    if (filterState.brands.length > 0 && !filterState.brands.includes(product.brand)) {
      return false;
    }

    // Price range
    if (product.sellingPrice < filterState.minPrice || product.sellingPrice > filterState.maxPrice) {
      return false;
    }

    // Rating
    if (filterState.minRating > 0 && product.rating < filterState.minRating) {
      return false;
    }

    // Stock
    if (filterState.inStockOnly && product.stock <= 0) {
      return false;
    }

    // Discount
    if (filterState.minDiscount > 0 && product.discountPercent < filterState.minDiscount) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filterState.sortBy) {
      case 'price-asc':
        return a.sellingPrice - b.sellingPrice;
      case 'price-desc':
        return b.sellingPrice - a.sellingPrice;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popularity':
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProduct,
        viewProduct,
        selectedCategory,
        viewCategory,
        selectedBrand,
        viewBrand,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        language,
        toggleLanguage,
        products,
        getProductById,
        getProductBySlug,
        filterState,
        setFilterState,
        resetFilters,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartSubtotal,
        cartMrpTotal,
        cartSavings,
        shippingFee,
        cartTotal,
        savedForLater,
        saveForLater,
        moveToCartFromSaved,
        removeSavedItem,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        coupons,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        currentPincode,
        pincodeCity,
        deliveryDaysEstimate,
        checkPincode,
        setDeliverPincode,
        orders,
        createOrder,
        getOrderById,
        updateOrderStatus,
        customerAddress,
        updateCustomerAddress,
        sendWhatsAppOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
