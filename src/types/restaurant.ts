export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  prepTime: number;
  available: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  gst: number;
  grandTotal: number;
  status: 'accepted' | 'preparing' | 'ready' | 'completed';
  estimatedTime: number;
  actualTime?: number;
  createdAt: Date;
  pickupTime?: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  favoriteItems: string[];
}