export type ProductCategory =
  | 'bp-monitors'
  | 'glucometers'
  | 'glucose-strips'
  | 'pulse-oximeters'
  | 'nebulizers'
  | 'thermometers'
  | 'weighing-scales'
  | 'respiratory-care'
  | 'orthopedic-supports'
  | 'wheelchairs'
  | 'walking-aids'
  | 'first-aid'
  | 'tens-pain-relief'
  | 'stethoscopes'
  | 'elderly-care'
  | 'combo-kits';

export interface ProductSpecification {
  modelNumber?: string;
  type?: string;
  displayType?: string;
  cuffSize?: string;
  memoryCapacity?: string;
  accuracy?: string;
  powerSource?: string;
  batteryLife?: string;
  dimensions?: string;
  weight?: string;
  warrantyPeriod?: string;
  certification?: string;
  origin?: string;
  boxContents?: string[];
  [key: string]: any;
}

export interface Product {
  id: string;
  sku: string;
  brand: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  warranty: string;
  specifications: ProductSpecification;
  features: string[];
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isOffer?: boolean;
  dealTag?: string; // e.g., 'Under ₹499', 'Under ₹999', 'Deal of the Day'
  deliveryEstimateDays?: number;
  compatibleWith?: string[];
  howToUseSteps?: string[];
  faqs?: { question: string; answer: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface SavedItem {
  product: Product;
  savedAt: string;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  mobile: string;
  alternatePhone?: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault: boolean;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  brand: string;
  quantity: number;
  price: number;
  mrp: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  appliedCoupon?: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Wallet' | 'COD';
  paymentStatus: 'Paid' | 'Pending' | 'COD Authorized';
  shippingAddress: CustomerAddress;
  status: OrderStatus;
  statusTimeline: {
    status: OrderStatus;
    timestamp: string;
    description: string;
  }[];
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryDate: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

export interface CustomerReview {
  id: string;
  productId: string;
  userName: string;
  location: string;
  rating: number;
  date: string;
  verifiedPurchase: boolean;
  title: string;
  comment: string;
  helpfulCount: number;
}

export type ActiveView =
  | 'home'
  | 'category'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'track-order'
  | 'compare'
  | 'account'
  | 'offers'
  | 'brands'
  | 'diabetes-care'
  | 'heart-bp'
  | 'respiratory-care'
  | 'orthopedic-care'
  | 'ai-hub'
  | 'admin';

export interface FilterState {
  searchQuery: string;
  category: ProductCategory | 'all';
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  minDiscount: number;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
