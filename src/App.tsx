import React, { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { ProductListing } from "./components/ProductListing";
import { ProductDetail } from "./components/ProductDetail";
import { Cart } from "./components/Cart";
import { VendorDashboard } from "./components/VendorDashboard";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import AboutPage from "./components/AboutPage";
import type { Page } from "./types/navigation";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  vendor: string;
  vendorId: string;
  category: string;
  location: string;
  freshness: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Vendor {
  id: string;
  name: string;
  type: "farm" | "cooperative" | "distributor";
  location: string;
  rating: number;
  products: number;
  verified: boolean;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userType, setUserType] = useState<"customer" | "vendor">("customer");

  const navigateTo = (page: Page, productId?: string, category?: string) => {
    setCurrentPage(page);
    if (productId && page === "product-detail") {
      // In a real app, this would fetch from API
      setSelectedProduct(mockProducts.find((p) => p.id === productId) || null);
    }
    if (category) {
      setSelectedCategory(category);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.product.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigateTo={navigateTo} />;
      case "about":
        return <AboutPage navigateTo={navigateTo} />;
      case "products":
        return (
          <ProductListing
            navigateTo={navigateTo}
            category={selectedCategory}
            addToCart={addToCart}
          />
        );
      case "product-detail":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            navigateTo={navigateTo}
            addToCart={addToCart}
          />
        ) : null;
      case "cart":
        return (
          <Cart
            cartItems={cartItems}
            updateQuantity={updateCartQuantity}
            navigateTo={navigateTo}
          />
        );
      case "vendor-dashboard":
        return <VendorDashboard navigateTo={navigateTo} />;
      case "customer-dashboard":
        return <CustomerDashboard navigateTo={navigateTo} />;
      case "admin-dashboard":
        return <AdminDashboard navigateTo={navigateTo} />;
      case "login":
        return <Login navigateTo={navigateTo} />;
      case "register":
        return <Register navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        navigateTo={navigateTo}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        userType={userType}
        setUserType={setUserType}
      />
      <main>{renderCurrentPage()}</main>
      <Footer />
    </div>
  );
};

// Mock data for demonstration
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Tomatoes",
    price: 1800,
    unit: "per kg",
    image:
      "https://images.unsplash.com/photo-1549248581-cf105cd081f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBmYXJtJTIwcHJvZHVjZXxlbnwxfHx8fDE3NTg5OTMzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Green Valley Farm",
    vendorId: "vendor1",
    category: "Vegetables",
    location: "Local (5km)",
    freshness: "Harvested today",
    description:
      "Fresh organic tomatoes grown without pesticides. Perfect for salads and cooking.",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Premium Apples",
    price: 2500,
    unit: "per kg",
    image:
      "https://images.unsplash.com/photo-1685564060600-53036354762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZnJ1aXRzJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzU5MDA2NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Orchard Co-op",
    vendorId: "vendor2",
    category: "Fruits",
    location: "Regional (25km)",
    freshness: "Picked yesterday",
    description:
      "Crisp and sweet premium apples from our certified organic orchard.",
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name: "Whole Grain Rice",
    price: 4800,
    unit: "per 5kg bag",
    image:
      "https://images.unsplash.com/photo-1701966997310-6e828deaf41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFpbnMlMjBjZXJlYWxzJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU5MDA2NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Heritage Grains",
    vendorId: "vendor3",
    category: "Grains",
    location: "Regional (40km)",
    freshness: "Harvested this season",
    description:
      "Premium whole grain rice, naturally grown and processed with traditional methods.",
    inStock: true,
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "4",
    name: "Fresh Spinach",
    price: 1520,
    unit: "per bunch",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFmeSUyMGdyZWVucyUyMHNwaW5hY2h8ZW58MXx8fHwxNzU5MDA2NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Green Valley Farm",
    vendorId: "vendor1",
    category: "Vegetables",
    location: "Local (5km)",
    freshness: "Harvested today",
    description:
      "Fresh organic spinach leaves, perfect for salads and smoothies.",
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "5",
    name: "Organic Bananas",
    price: 1160,
    unit: "per kg",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYmFuYW5hcyUyMGZydWl0c3xlbnwxfHx8fDE3NTkwMDY1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Tropical Farms",
    vendorId: "vendor4",
    category: "Fruits",
    location: "Regional (30km)",
    freshness: "Picked this week",
    description:
      "Sweet and naturally ripened organic bananas from sustainable farms.",
    inStock: true,
    rating: 4.5,
    reviews: 298,
  },
  {
    id: "6",
    name: "Free-Range Eggs",
    price: 3400,
    unit: "per dozen",
    image:
      "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlJTIwcmFuZ2UlMjBlZ2dzfGVufDF8fHx8MTc1OTAwNjUyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Happy Hen Farm",
    vendorId: "vendor5",
    category: "Dairy",
    location: "Local (8km)",
    freshness: "Laid this morning",
    description: "Fresh free-range eggs from pasture-raised hens.",
    inStock: true,
    rating: 4.9,
    reviews: 412,
  },
  {
    id: "7",
    name: "Sweet Corn",
    price: 2080,
    unit: "per 6 ears",
    image:
      "https://images.unsplash.com/photo-1583114963017-64b5e3e29ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMGNvcm4lMjB2ZWdldGFibGV8ZW58MXx8fHwxNzU5MDA2NTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Sunny Acres",
    vendorId: "vendor6",
    category: "Vegetables",
    location: "Regional (15km)",
    freshness: "Harvested yesterday",
    description:
      "Sweet and tender corn on the cob, perfect for grilling or boiling.",
    inStock: true,
    rating: 4.6,
    reviews: 187,
  },
  {
    id: "8",
    name: "Fresh Strawberries",
    price: 3120,
    unit: "per 500g",
    image:
      "https://images.unsplash.com/photo-1548848979-b4ef94e37800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHN0cmF3YmVycmllcyUyMGZydWl0c3xlbnwxfHx8fDE3NTkwMDY1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Berry Patch Farm",
    vendorId: "vendor7",
    category: "Fruits",
    location: "Local (12km)",
    freshness: "Picked today",
    description:
      "Juicy and sweet strawberries, grown without synthetic pesticides.",
    inStock: true,
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "9",
    name: "Quinoa Grain",
    price: 6200,
    unit: "per 2kg bag",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBncmFpbiUyMHN1cGVyZm9vZHxlbnwxfHx8fDE3NTkwMDY1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    vendor: "Superfood Grains",
    vendorId: "vendor8",
    category: "Grains",
    location: "Regional (35km)",
    freshness: "Recently processed",
    description:
      "Nutritious quinoa grain packed with protein and essential amino acids.",
    inStock: true,
    rating: 4.7,
    reviews: 134,
  },
];

export const mockVendors: Vendor[] = [
  {
    id: "vendor1",
    name: "Green Valley Farm",
    type: "farm",
    location: "Springfield Valley",
    rating: 4.8,
    products: 45,
    verified: true,
  },
  {
    id: "vendor2",
    name: "Orchard Co-op",
    type: "cooperative",
    location: "Mountain View",
    rating: 4.6,
    products: 32,
    verified: true,
  },
  {
    id: "vendor3",
    name: "Heritage Grains",
    type: "distributor",
    location: "Prairie Fields",
    rating: 4.9,
    products: 18,
    verified: true,
  },
];

export default App;
