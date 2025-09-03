import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">MOS Restaurant</h3>
            <p className="text-gray-300">
              Authentic Indian cuisine and delicious pizza. Quality food, served fresh.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">
                  Salt Lake City, Sector V<br />
                  Kolkata, West Bengal 700091
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">+91 9876-543-210</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">info@mosrestaurant.com</span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Opening Hours
            </h4>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 10:00 PM</span>
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <p className="text-primary font-medium text-sm">Pickup Only</p>
              <p className="text-gray-300 text-xs">No delivery service available</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            
            <div className="space-y-2 text-sm">
              <a href="#menu" className="block text-gray-300 hover:text-primary transition-colors">
                Our Menu
              </a>
              <a href="#orders" className="block text-gray-300 hover:text-primary transition-colors">
                Track Orders
              </a>
              <a href="#about" className="block text-gray-300 hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#privacy" className="block text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="block text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Specialties</h4>
            
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span>🍛</span>
                <span>Authentic Biryani</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🍕</span>
                <span>Wood-fired Pizza</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌶️</span>
                <span>Indian Curries</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🥤</span>
                <span>Fresh Beverages</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/20 to-red-500/20 border border-primary/30 rounded-lg p-3">
              <p className="font-medium text-primary">Quality Promise</p>
              <p className="text-xs text-gray-300">Fresh ingredients, made to order</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 MOS Restaurant. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              Made with ❤️ for food lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};