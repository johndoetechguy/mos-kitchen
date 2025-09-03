import { Star, Clock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/types/restaurant";

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export const MenuCard = ({ item, quantity, onAddToCart, onUpdateQuantity }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {item.rating}
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            {item.prepTime}m
          </div>
        </div>
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold bg-destructive px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="text-lg font-bold text-primary">₹{item.price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center">
          {quantity > 0 ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, Math.max(0, quantity - 1))}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-semibold min-w-[20px] text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div></div>
          )}
          
          <Button 
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className="bg-primary hover:bg-primary-hover"
          >
            {quantity > 0 ? "Update" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};