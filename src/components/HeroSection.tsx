import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-biryani.jpg";

interface HeroSectionProps {
  onExploreMenu: () => void;
}

export const HeroSection = ({ onExploreMenu }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Authentic <span className="text-primary">Biryani</span> & 
          <br />Delicious <span className="text-red-500">Pizza</span>
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of traditional Indian flavors and classic Italian taste. 
          Order now for quick pickup at MOS Restaurant.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={onExploreMenu}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-6 text-lg font-semibold"
          >
            Explore Menu
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4">
            <p className="text-white font-medium">🕒 Ready in 15-30 mins</p>
            <p className="text-white/80 text-sm">Pickup Only</p>
          </div>
        </div>
      </div>
    </section>
  );
};