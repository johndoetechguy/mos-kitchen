import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MenuCard } from "./MenuCard";
import { MenuItem, CartItem } from "@/types/restaurant";
import { menuItems, categories } from "@/data/menuData";

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export const MenuSection = ({ cart, onAddToCart, onUpdateQuantity }: MenuSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(item => item.menuItem.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search for dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`min-w-fit ${
              selectedCategory === category.id 
                ? "bg-primary text-primary-foreground" 
                : ""
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <MenuCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(item.id)}
            onAddToCart={onAddToCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};