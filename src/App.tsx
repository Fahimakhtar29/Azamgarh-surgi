import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';

// Homepage Sections in exact specified hierarchy
import { HeroSection } from './components/home/HeroSection';
import { TrustBadges } from './components/home/TrustBadges';
import { ShopByCategory } from './components/home/ShopByCategory';
import { HealthMonitoringSection } from './components/home/HealthMonitoringSection';
import { BestSellers } from './components/home/BestSellers';
import { CareForParents } from './components/home/CareForParents';
import { DiabetesCareSection } from './components/home/DiabetesCareSection';
import { HeartBpCareSection } from './components/home/HeartBpCareSection';
import { RespiratoryCareSection } from './components/home/RespiratoryCareSection';
import { OrthopedicCareSection } from './components/home/OrthopedicCareSection';
import { ComboOffers } from './components/home/ComboOffers';
import { BestDeals } from './components/home/BestDeals';
import { PopularBrands } from './components/home/PopularBrands';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { CustomerReviews } from './components/home/CustomerReviews';
import { FaqSection } from './components/home/FaqSection';

// Page Views
import { CategoryPage } from './components/category/CategoryPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { ProductComparePage } from './components/compare/ProductComparePage';
import { AccountPage } from './components/account/AccountPage';
import { OffersPage } from './components/offers/OffersPage';
import { BrandsPage } from './components/brands/BrandsPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductQuickViewModal } from './components/product/ProductQuickViewModal';
import { AiHealthcareHub } from './components/ai/AiHealthcareHub';
import { FloatingChatWidget } from './components/ai/FloatingChatWidget';

const AppContent: React.FC = () => {
  const { activeView, selectedProduct, products } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-600 selection:text-white pb-16 lg:pb-0">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header />

      {/* 3. Navigation */}
      <Navigation />

      {/* Main Content Area based on active view */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* 4. Hero Section */}
            <HeroSection />

            {/* 5. Trust Badges */}
            <TrustBadges />

            {/* 6. Shop by Category */}
            <ShopByCategory />

            {/* 7. Health Monitoring Section */}
            <HealthMonitoringSection />

            {/* 8. Best Sellers */}
            <BestSellers />

            {/* 9. Care For Your Parents */}
            <CareForParents />

            {/* 10. Diabetes Care */}
            <DiabetesCareSection />

            {/* 11. Heart & BP Care */}
            <HeartBpCareSection />

            {/* 12. Respiratory Care */}
            <RespiratoryCareSection />

            {/* 13. Orthopedic Care */}
            <OrthopedicCareSection />

            {/* 14. Combo Offers */}
            <ComboOffers />

            {/* 15. Best Deals */}
            <BestDeals />

            {/* 16. Popular Brands */}
            <PopularBrands />

            {/* 17. Why Choose Us */}
            <WhyChooseUs />

            {/* 18. Customer Reviews */}
            <CustomerReviews />

            {/* 19. FAQ */}
            <FaqSection />
          </>
        )}

        {activeView === 'category' && <CategoryPage />}

        {activeView === 'product-detail' && (
          <ProductDetailPage product={selectedProduct || products[0]} />
        )}

        {activeView === 'checkout' && <CheckoutPage />}

        {activeView === 'track-order' && <OrderTrackingPage />}

        {activeView === 'compare' && <ProductComparePage />}

        {activeView === 'account' && <AccountPage />}

        {activeView === 'offers' && <OffersPage />}

        {activeView === 'brands' && <BrandsPage />}

        {activeView === 'ai-hub' && <AiHealthcareHub />}

        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* 20. Footer */}
      <Footer />

      {/* Overlays & AI Assistant */}
      <CartDrawer />
      <ProductQuickViewModal />
      <FloatingChatWidget />
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
