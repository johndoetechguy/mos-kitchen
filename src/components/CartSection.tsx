import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/restaurant";

interface CartSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

export const CartSection = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout }: CartSectionProps) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + gst;

  if (cart.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">Add some delicious items from our menu!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Order ({cart.length} items)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <img 
                src={item.menuItem.image} 
                alt={item.menuItem.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h4 className="font-semibold">{item.menuItem.name}</h4>
                <p className="text-muted-foreground text-sm">₹{item.menuItem.price} each</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity - 1)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold min-w-[32px] text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.menuItem.id, item.quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{item.menuItem.price * item.quantity}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.menuItem.id)}
                  className="text-destructive hover:text-destructive p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          
          <Button 
            onClick={onCheckout}
            className="w-full bg-primary hover:bg-primary-hover"
            size="lg"
          >
            Proceed to Checkout
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            Pickup only • Payment required before preparation
          </p>
        </CardContent>
      </Card>
    </div>
  );
};