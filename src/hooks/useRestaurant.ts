import { useState, useCallback } from "react";
import { MenuItem, CartItem, Order, UserProfile } from "@/types/restaurant";
import { menuItems } from "@/data/menuData";

export const useRestaurant = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    totalOrders: 0,
    favoriteItems: [],
  });

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.menuItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { id: item.id, menuItem: item, quantity: 1 }];
      }
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.menuItem.id !== itemId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.menuItem.id === itemId
            ? { ...item, quantity }
            : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.menuItem.id !== itemId));
  }, []);

  const checkDuplicateOrder = useCallback((cartItems: CartItem[]) => {
    const activeOrders = orders.filter(order => order.status !== 'completed');
    
    return activeOrders.some(order => {
      if (order.items.length !== cartItems.length) return false;
      
      return cartItems.every(cartItem => 
        order.items.some(orderItem => 
          orderItem.menuItem.id === cartItem.menuItem.id && 
          orderItem.quantity === cartItem.quantity
        )
      );
    });
  }, [orders]);

  const checkout = useCallback(() => {
    if (cart.length === 0) return;

    // Check for duplicate orders
    const isDuplicate = checkDuplicateOrder(cart);
    if (isDuplicate) {
      return { isDuplicate: true, message: "You already have an identical active order. Would you like to continue anyway?" };
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst;

    // Calculate estimated time based on items
    const estimatedTime = cart.reduce((max, item) => 
      Math.max(max, item.menuItem.prepTime), 0
    ) + 5; // Add 5 minutes buffer

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: subtotal,
      gst,
      grandTotal,
      status: 'accepted',
      estimatedTime,
      createdAt: new Date(),
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCart([]);
    
    // Update profile stats
    setProfile(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
    }));

    // Simulate order progression
    setTimeout(() => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === newOrder.id
            ? { ...order, status: 'preparing' as const }
            : order
        )
      );
    }, 30000); // 30 seconds

    setTimeout(() => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === newOrder.id
            ? { ...order, status: 'ready' as const }
            : order
        )
      );
    }, estimatedTime * 60 * 1000); // Estimated time in milliseconds

    return newOrder;
  }, [cart, checkDuplicateOrder]);

  const forceCheckout = useCallback(() => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + gst;

    const estimatedTime = cart.reduce((max, item) => 
      Math.max(max, item.menuItem.prepTime), 0
    ) + 5;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: subtotal,
      gst,
      grandTotal,
      status: 'accepted',
      estimatedTime,
      createdAt: new Date(),
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCart([]);
    
    setProfile(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1,
    }));

    // Simulate order progression
    setTimeout(() => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === newOrder.id
            ? { ...order, status: 'preparing' as const }
            : order
        )
      );
    }, 30000);

    setTimeout(() => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === newOrder.id
            ? { ...order, status: 'ready' as const }
            : order
        )
      );
    }, estimatedTime * 60 * 1000);

    return newOrder;
  }, [cart]);

  const updateProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
  }, []);

  const getTotalCartItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  }, [cart]);

  return {
    cart,
    orders,
    profile,
    menuItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout,
    forceCheckout,
    updateProfile,
    getTotalCartItems,
    getCartTotal,
    checkDuplicateOrder,
  };
};