import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, MapPin } from "lucide-react";
import { CartItem } from "@/types/restaurant";

interface PaymentSectionProps {
  cart: CartItem[];
  onPaymentSuccess: () => void;
  onBack: () => void;
}

export const PaymentSection = ({ cart, onPaymentSuccess, onBack }: PaymentSectionProps) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      if (formattedValue.length > 19) return;
    } else if (field === "expiryDate") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})/, "$1/");
      if (formattedValue.length > 5) return;
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 3) return;
    }
    
    setPaymentData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  const isFormValid = paymentData.cardNumber.length >= 19 && 
                     paymentData.expiryDate.length === 5 && 
                     paymentData.cvv.length === 3 && 
                     paymentData.cardholderName.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>
          ← Back to Cart
        </Button>
        <h1 className="text-2xl font-bold">Payment Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={paymentData.cardholderName}
                    onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Pickup Notice */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Pickup Information</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your order will be ready for pickup at MOS Restaurant, Salt Lake City, Sector V, Kolkata.
                    We do not offer delivery service.
                  </p>
                  <p className="text-sm font-medium text-primary mt-2">
                    📍 Payment required before preparation begins
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.menuItem.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.menuItem.price}</p>
                    </div>
                    <p className="font-medium">₹{item.menuItem.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (5%)</span>
                  <span>₹{gst}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary-hover"
                size="lg"
                disabled={!isFormValid}
              >
                <Lock className="h-4 w-4 mr-2" />
                Pay ₹{total}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By placing this order, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};