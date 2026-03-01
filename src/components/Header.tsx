import React, { useState, useEffect } from "react";
import { useRouter as useNextRouter } from "next/router";
import { useRouterStateSafe } from "../utils/router";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Phone,
  Clock,
  Mail,
  ChevronRight,
  X,
  // Agricultural Icons
  Carrot,
  Apple,
  Wheat,
  Fish,
  Egg,
  Droplet,
  Tractor,
  ShoppingBasket,
} from "lucide-react";

const Badge = ({ children, className = "" }: any) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

// --- Types ---
export type Page =
  | "home"
  | "login"
  | "register"
  | "cart"
  | "vendor-dashboard"
  | "customer-dashboard"
  | "admin-dashboard"
  | "product"
  | "product-detail"
  | "vendor"
  | "customer"
  | "admin"
  | "about"
  | "products";

// --- Categories Data (Agricultural Theme) ---
const CATEGORIES = [
  {
    id: 1,
    name: "Fresh Vegetables",
    icon: Carrot,
    sub: [
      "Tomatoes & Peppers",
      "Leafy Greens",
      "Onions & Garlic",
      "Okra & Garden Egg",
      "Cucumbers",
    ],
  },
  {
    id: 2,
    name: "Fresh Fruits",
    icon: Apple,
    sub: [
      "Citrus Fruits",
      "Pineapples & Melons",
      "Mangoes & Bananas",
      "Avocados",
      "Berries",
    ],
  },
  {
    id: 3,
    name: "Tubers & Grains",
    icon: Wheat,
    sub: [
      "Yam & Cassava",
      "Rice & Beans",
      "Maize/Corn",
      "Sweet Potatoes",
      "Irish Potatoes",
    ],
  },
  {
    id: 4,
    name: "Meat & Seafood",
    icon: Fish,
    sub: [
      "Fresh Chicken",
      "Beef & Goat Meat",
      "Fresh Fish",
      "Dried Fish & Stockfish",
      "Snails & Shellfish",
    ],
  },
  {
    id: 5,
    name: "Dairy & Poultry",
    icon: Egg,
    sub: ["Fresh Eggs", "Fresh Milk", "Local Cheese (Wara)", "Yoghurt"],
  },
  {
    id: 6,
    name: "Oils & Spices",
    icon: Droplet,
    sub: [
      "Red Palm Oil",
      "Vegetable Oil",
      "Local Spices",
      "Honey",
      "Ginger & Turmeric",
    ],
  },
  {
    id: 7,
    name: "Farm Inputs",
    icon: Tractor,
    sub: [
      "Quality Seeds",
      "Fertilizers",
      "Pest Control",
      "Farm Tools",
      "Animal Feed",
    ],
  },
  {
    id: 8,
    name: "Processed Foods",
    icon: ShoppingBasket,
    sub: [
      "Garri",
      "Yam Flour (Elubo)",
      "Plantain Flour",
      "Dried Spices",
      "Smoked Goods",
    ],
  },
];

// --- Header Component ---
interface HeaderProps {
  navigateTo: (page: Page) => void;
  cartItemsCount: number;
  userType: "customer" | "vendor";
  setUserType: (type: "customer" | "vendor") => void;
}

export const Header: React.FC<HeaderProps> = ({
  navigateTo,
  cartItemsCount,
  userType,
  setUserType,
}) => {
  const nextRouter = useNextRouter();
  const router = useRouterStateSafe();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const mapPageToPath = (p: Page) => {
    switch (p) {
      case "home":
        return "/";
      case "about":
        return "/about";
      case "products":
        return "/products";
      case "product":
      case "product-detail":
        return "/product";
      case "cart":
        return "/cart";
      case "vendor-dashboard":
      case "vendor":
        return "/vendor";
      case "customer-dashboard":
      case "customer":
        return "/customer";
      case "admin-dashboard":
      case "admin":
        return "/admin";
      case "login":
        return "/login";
      case "register":
        return "/register";
      default:
        return "/";
    }
  };

  const doNavigate = (p: Page) => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);

    // Prefer Next router when available (client navigation with real paths)
    if (nextRouter && typeof nextRouter.push === "function") {
      nextRouter.push(mapPageToPath(p));
      return;
    }

    // Fall back to our optional in-memory router
    if (router) {
      router.setPage(p as any);
      router.setPageProps(undefined);
      return;
    }

    // Last resort: use provided navigate prop
    if (navigateTo) navigateTo(p);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="font-sans text-gray-900 overflow-x-clip">
      {/* Top Bar */}
      <div className="hidden bg-gray-800 text-white text-sm md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+2348066246499</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Always Live</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>info@cefmart.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#e7e9ec] border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo - EXACTLY AS REQUESTED */}
            <button
              onClick={() => doNavigate("home")}
              className="flex items-center bg-[#e7e9ec]"
            >
              <img
                src="/logo.png"
                alt="CEFMART Logo"
                className="h-16 w-auto object-contain transition-opacity hover:opacity-90 max-md:h-12"
              />
            </button>

            {/* Desktop Nav List */}
            <nav className="hidden flex-1 justify-center md:flex">
              <ul className="flex items-center gap-8 text-sm">
                <li>
                  <button
                    onClick={() => doNavigate("about")}
                    className="cursor-pointer text-gray-700 transition-colors hover:text-cyan-500"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => doNavigate("products")}
                    className="cursor-pointer text-gray-700 transition-colors hover:text-cyan-500"
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => doNavigate("products")}
                    className="cursor-pointer text-gray-700 transition-colors hover:text-cyan-500"
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => doNavigate("about")}
                    className="cursor-pointer text-gray-700 transition-colors hover:text-cyan-500"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => doNavigate("login")}
                    className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-100"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => doNavigate("register")}
                    className="cursor-pointer rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700"
                  >
                    Register
                  </button>
                </li>
              </ul>
            </nav>
            <div className="hidden w-[180px] md:block" />

            {/* Mobile Actions: Search, Cart, User, Hamburger */}
            <div className="flex items-center space-x-1 md:hidden">
              <button
                onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-cyan-500"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {userType === "customer" && (
                <button
                  onClick={() => doNavigate("cart")}
                  className="relative rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-cyan-500"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 p-0 flex items-center justify-center text-[10px] text-white">
                      {cartItemsCount}
                    </Badge>
                  )}
                </button>
              )}
              <button
                onClick={() =>
                  doNavigate(
                    userType === "vendor"
                      ? "vendor-dashboard"
                      : "customer-dashboard",
                  )
                }
                className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-cyan-500"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-cyan-500"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {isMobileSearchOpen && (
            <div className="pb-3 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-4 pr-11 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {isMobileMenuOpen && (
            <div className="border-t border-gray-300 pb-3 pt-5 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => doNavigate("about")}
                  className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  About
                </button>
                <button
                  onClick={() => doNavigate("products")}
                  className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Shop
                </button>
                <button
                  onClick={() => doNavigate("products")}
                  className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Product
                </button>
                <button
                  onClick={() => doNavigate("about")}
                  className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  FAQs
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => doNavigate("login")}
                  className="cursor-pointer h-9 w-full rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => doNavigate("register")}
                  className="cursor-pointer h-9 w-full rounded-md bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  Register
                </button>
              </div>
              <div className="space-y-1 rounded-md border border-gray-300 bg-white p-2">
                <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  All Categories
                </div>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => doNavigate("products")}
                    className="flex w-full items-center justify-between rounded px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <span className="flex items-center space-x-2">
                      <category.icon className="h-4 w-4 text-gray-400" />
                      <span>{category.name}</span>
                    </span>
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
};

// --- Main App Wrapper for Preview ---
export default function App() {
  const [cartCount, setCartCount] = useState(3);
  const [userType, setUserType] = useState<"customer" | "vendor">("customer");
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const handleNavigate = (page: Page) => {
    console.log(`Navigating to: ${page}`);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        navigateTo={handleNavigate}
        cartItemsCount={cartCount}
        userType={userType}
        setUserType={setUserType}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-500 py-20 bg-white rounded-lg shadow border border-dashed border-gray-300">
          <h2 className="text-2xl font-semibold mb-2">
            Page Content:{" "}
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h2>
          <p>Click "All Categories" to see the functional dropdown menu.</p>
        </div>
      </main>
    </div>
  );
}
