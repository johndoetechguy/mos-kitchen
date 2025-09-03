import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
}

export const Navigation = ({ activeTab, onTabChange, cartCount }: NavigationProps) => {
  const tabs = [
    { id: "menu", label: "Menu" },
    { id: "orders", label: "My Orders" },
    { id: "cart", label: "Cart", count: cartCount },
    { id: "profile", label: "Profile" },
  ];

  return (
    <nav className="bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-3">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`relative min-w-fit ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              {tab.count && tab.count > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 min-w-5 text-xs">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};