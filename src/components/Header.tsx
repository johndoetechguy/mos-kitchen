import { ShoppingCart, Bell, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onProfileClick: () => void;
}

export const Header = ({ cartCount, onCartClick, onProfileClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-primary shadow-elevated">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white">
              <h1 className="text-2xl font-bold">MOS Restaurant</h1>
              <p className="text-sm text-white/90">Indian Cuisine & Pizza</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
              onClick={onProfileClick}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="text-center py-3 text-white/90 text-sm border-t border-white/20">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" />
            Pickup Only • Open Daily 11 AM - 10 PM
          </div>
        </div>
      </div>
    </header>
  );
};