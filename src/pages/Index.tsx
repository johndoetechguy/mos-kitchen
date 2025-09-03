import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { MenuSection } from "@/components/MenuSection";
import { CartSection } from "@/components/CartSection";
import { OrdersSection } from "@/components/OrdersSection";
import { ProfileSection } from "@/components/ProfileSection";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { PaymentSection } from "@/components/PaymentSection";
import { PaymentSuccessModal } from "@/components/PaymentSuccessModal";
import { NotificationBanner } from "@/components/NotificationBanner";
import { useRestaurant } from "@/hooks/useRestaurant";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/types/restaurant";

const Index = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const { toast } = useToast();
  
  const {
    cart,
    orders,
    profile,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout,
    forceCheckout,
    updateProfile,
    getTotalCartItems,
  } = useRestaurant();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    const result = checkout();
    
    if (result && 'isDuplicate' in result && result.isDuplicate) {
      setDuplicateWarning(result.message);
      setShowPayment(false);
      return;
    }
    
    if (result && !('isDuplicate' in result)) {
      setCompletedOrder(result);
      setShowPayment(false);
      setShowSuccessModal(true);
    }
  };

  const handleForceCheckout = () => {
    const order = forceCheckout();
    if (order) {
      setCompletedOrder(order);
      setDuplicateWarning(null);
      setShowSuccessModal(true);
    }
  };

  const handleTrackOrder = () => {
    setShowSuccessModal(false);
    setActiveTab("orders");
    toast({
      title: "Order placed successfully!",
      description: `Order #${completedOrder?.id.slice(-6)} is being prepared. Estimated time: ${completedOrder?.estimatedTime} minutes.`,
    });
  };

  const handleUpdateProfile = (newProfile: any) => {
    updateProfile(newProfile);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header 
        cartCount={getTotalCartItems()}
        onCartClick={() => setActiveTab("cart")}
        onProfileClick={() => setActiveTab("profile")}
      />
      
      <Navigation 
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab !== "payment") {
            setShowPayment(false);
          }
          setActiveTab(tab);
        }}
        cartCount={getTotalCartItems()}
      />

      {/* Duplicate Order Warning */}
      {duplicateWarning && (
        <div className="container mx-auto px-4 pt-4">
          <NotificationBanner
            message={duplicateWarning}
            type="warning"
            onClose={() => setDuplicateWarning(null)}
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleForceCheckout}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
            >
              Continue Anyway
            </button>
            <button
              onClick={() => setDuplicateWarning(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6">
        {activeTab === "menu" && !showPayment && (
          <>
            <HeroSection onExploreMenu={() => {}} />
            <MenuSection
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={updateQuantity}
            />
          </>
        )}
        
        {activeTab === "orders" && !showPayment && (
          <OrdersSection orders={orders} />
        )}
        
        {(activeTab === "cart" || showPayment) && !showPayment && (
          <CartSection
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}

        {showPayment && (
          <PaymentSection
            cart={cart}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setShowPayment(false)}
          />
        )}
        
        {activeTab === "profile" && !showPayment && (
          <ProfileSection
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Payment Success Modal */}
      {showSuccessModal && completedOrder && (
        <PaymentSuccessModal
          order={completedOrder}
          onTrackOrder={handleTrackOrder}
          onClose={() => {
            setShowSuccessModal(false);
            setActiveTab("menu");
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default Index;
