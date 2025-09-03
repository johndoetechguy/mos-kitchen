import { CheckCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/restaurant";

interface PaymentSuccessModalProps {
  order: Order;
  onTrackOrder: () => void;
  onClose: () => void;
}

export const PaymentSuccessModal = ({ order, onTrackOrder, onClose }: PaymentSuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md mx-4 animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-800">Payment Successful!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Order ID</span>
              <span className="font-mono text-sm">#{order.id.slice(-6)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Paid</span>
              <span className="font-semibold text-lg">₹{order.grandTotal}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Items</span>
              <span>{order.items.length} item(s)</span>
            </div>
          </div>

          {/* Preparation Time */}
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Estimated Preparation Time</p>
              <p className="text-sm text-blue-700">{order.estimatedTime} minutes</p>
            </div>
          </div>

          {/* Pickup Information */}
          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Pickup Location</p>
              <p className="text-sm text-gray-600">
                MOS Restaurant<br />
                Salt Lake City, Sector V<br />
                Kolkata, West Bengal 700091
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onTrackOrder}
              className="w-full bg-primary hover:bg-primary-hover"
              size="lg"
            >
              Track Your Order
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Continue Browsing
            </Button>
          </div>

          <p className="text-xs text-center text-gray-500">
            You'll receive updates as your order is being prepared. Thank you for choosing MOS Restaurant!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};