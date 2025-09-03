import { MenuItem } from "@/types/restaurant";
import chickenBiryaniImg from "@/assets/chicken-biryani.jpg";
import vegBiryaniImg from "@/assets/veg-biryani.jpg";
import margheritaPizzaImg from "@/assets/margherita-pizza.jpg";
import pepperoniPizzaImg from "@/assets/pepperoni-pizza.jpg";

export const menuItems: MenuItem[] = [
  // Biryani
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    price: 450,
    description: "Aromatic basmati rice with tender chicken pieces, cooked with traditional spices and saffron",
    category: "biryani",
    image: chickenBiryaniImg,
    rating: 4.8,
    prepTime: 25,
    available: true,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    price: 550,
    description: "Premium mutton cooked with fragrant basmati rice and authentic Hyderabadi spices",
    category: "biryani",
    image: chickenBiryaniImg, // Reusing for now
    rating: 4.9,
    prepTime: 35,
    available: true,
  },
  {
    id: "veg-biryani",
    name: "Vegetable Biryani",
    price: 350,
    description: "Mixed vegetables and basmati rice cooked with aromatic spices, nuts, and raisins",
    category: "biryani",
    image: vegBiryaniImg,
    rating: 4.6,
    prepTime: 20,
    available: true,
  },

  // Pizza
  {
    id: "margherita",
    name: "Margherita Pizza",
    price: 320,
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil leaves",
    category: "pizza",
    image: margheritaPizzaImg,
    rating: 4.7,
    prepTime: 15,
    available: true,
  },
  {
    id: "pepperoni",
    name: "Pepperoni Pizza",
    price: 420,
    description: "Loaded with spicy pepperoni slices and melted mozzarella cheese",
    category: "pizza",
    image: pepperoniPizzaImg,
    rating: 4.8,
    prepTime: 15,
    available: true,
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme",
    price: 380,
    description: "Bell peppers, onions, mushrooms, olives with mozzarella cheese",
    category: "pizza",
    image: margheritaPizzaImg, // Reusing for now
    rating: 4.5,
    prepTime: 18,
    available: true,
  },

  // Sides
  {
    id: "garlic-naan",
    name: "Garlic Naan",
    price: 80,
    description: "Soft Indian flatbread topped with garlic and butter",
    category: "sides",
    image: margheritaPizzaImg, // Placeholder
    rating: 4.4,
    prepTime: 8,
    available: true,
  },
  {
    id: "chicken-wings",
    name: "Spicy Chicken Wings",
    price: 250,
    description: "Crispy chicken wings tossed in spicy sauce",
    category: "sides",
    image: chickenBiryaniImg, // Placeholder
    rating: 4.6,
    prepTime: 12,
    available: true,
  },

  // Beverages
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    price: 120,
    description: "Traditional yogurt-based drink with fresh mango pulp",
    category: "beverages",
    image: margheritaPizzaImg, // Placeholder
    rating: 4.7,
    prepTime: 3,
    available: true,
  },
  {
    id: "masala-chai",
    name: "Masala Chai",
    price: 60,
    description: "Traditional Indian spiced tea with milk",
    category: "beverages",
    image: chickenBiryaniImg, // Placeholder
    rating: 4.5,
    prepTime: 5,
    available: true,
  },
];

export const categories = [
  { id: "all", name: "All Items" },
  { id: "biryani", name: "Biryani" },
  { id: "pizza", name: "Pizza" },
  { id: "sides", name: "Sides" },
  { id: "beverages", name: "Beverages" },
];