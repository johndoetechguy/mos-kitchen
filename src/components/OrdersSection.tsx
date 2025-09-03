import { useEffect, useState } from "react";
import { Clock, CheckCircle, Utensils, Package, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Order } from "@/types/restaurant";

interface OrdersSectionProps {
  orders: Order[];
}

export const OrdersSection = ({ orders }: OrdersSectionProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5" />;
      case 'preparing':
        return <Utensils className="h-5 w-5" />;
      case 'ready':
        return <Package className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getStatusProgress = (status: Order['status']) => {
    switch (status) {
      case 'accepted':
        return 25;
      case 'preparing':
        return 50;
      case 'ready':
        return 75;
      case 'completed':
        return 100;
    }
  };

  const getTimeRemaining = (order: Order) => {
    if (order.status === 'completed') return 0;
    
    const elapsed = Math.floor((currentTime.getTime() - order.createdAt.getTime()) / 1000 / 60);
    const remaining = Math.max(0, order.estimatedTime - elapsed);
    return remaining;
  };

  const formatTime = (minutes: number) => {
    if (minutes <= 0) return "Ready!";
    return `${minutes}m remaining`;
  };

  if (orders.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="py-12">
          <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">Your order history will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  const activeOrders = orders.filter(order => order.status !== 'completed');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gradient bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
            Active Orders
          </h2>
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <Card key={order.id} className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 overflow-hidden">
                <div className="border-l-4 border-primary">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          Order #{order.id.slice(-6)}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Ordered at {order.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`px-3 py-2 font-semibold
                          ${order.status === 'accepted' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                          ${order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}
                          ${order.status === 'ready' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Progress Section */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-2xl text-gray-900">
                            {order.status === 'ready' ? '🎉 Ready for Pickup!' : formatTime(getTimeRemaining(order))}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.items.length} items • ₹{order.grandTotal}
                          </p>
                        </div>
                      </div>
                      
                      <Progress 
                        value={getStatusProgress(order.status)} 
                        className="h-3 bg-gray-200"
                      />
                    </div>

                    {/* Order Items with Images */}
                    <div className="bg-white/70 rounded-xl p-4 border border-gray-100">
                      <h4 className="font-semibold mb-4 text-gray-900">Order Items:</h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                            <img 
                              src={item.menuItem.image} 
                              alt={item.menuItem.name}
                              className="w-16 h-16 object-cover rounded-lg shadow-sm"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold text-gray-900">{item.menuItem.name}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-xs text-gray-600">{item.menuItem.rating}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-primary">₹{item.menuItem.price * item.quantity}</p>
                                  <p className="text-xs text-gray-500">₹{item.menuItem.price} each</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.status === 'ready' && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Package className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-green-800 font-bold text-lg">Order Ready!</p>
                            <p className="text-green-700 text-sm">
                              Please visit MOS Restaurant for pickup. Salt Lake City, Sector V, Kolkata.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Order History */}
      {completedOrders.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gradient bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
            Order History
          </h2>
          <div className="grid gap-4">
            {completedOrders.slice(0, 5).map((order) => (
              <Card key={order.id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Order #{order.id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} items • ₹{order.grandTotal}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                        ✓ Completed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};