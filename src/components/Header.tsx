import React, { useState, useEffect, useRef } from "react";
import { useRouter as useNextRouter } from "next/router";
import { useRouterStateSafe } from "../utils/router";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  Phone,
  Clock,
  Mail,
  ChevronRight,
  X,
  ChevronDown,
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

// --- Mock UI Components (Required for standalone execution) ---
const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  onClick,
}: any) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-cyan-600 text-white hover:bg-cyan-700 shadow",
    outline:
      "border border-input bg-transparent shadow-sm hover:bg-gray-100 hover:text-gray-900",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };
  const sizes = {
    sm: "h-8 rounded-md px-3 text-xs",
    md: "h-9 px-4 py-2",
    icon: "h-9 w-9",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${
        variants[variant as keyof typeof variants] || variants.default
      } ${sizes[size as keyof typeof sizes] || sizes.md} ${className}`}
    >
      {children}
    </button>
  );
};

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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

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
    setIsCategoryOpen(false);
    setActiveCategory(null);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

            {/* Search Bar (Desktop) */}
            <div className="mx-8 hidden max-w-2xl flex-1 md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center space-x-4 md:flex">
              {/* Login & Register Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => doNavigate("login")}
                  className="text-sm h-9 px-4 max-md:h-8 max-md:px-3 max-md:text-xs"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => doNavigate("register")}
                  className="text-sm h-9 px-4 bg-green-600 hover:bg-green-700 max-md:h-8 max-md:px-3 max-md:text-xs"
                >
                  Register
                </Button>
              </div>

              {/* Cart */}
              {userType === "customer" && (
                <button
                  onClick={() => doNavigate("cart")}
                  className="relative p-2 text-gray-600 hover:text-cyan-500 transition-colors"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 p-0 flex items-center justify-center text-xs text-white">
                      {cartItemsCount}
                    </Badge>
                  )}
                </button>
              )}

              {/* Wishlist */}
              <button className="hidden p-2 text-gray-600 transition-colors hover:text-cyan-500 sm:block">
                <Heart className="h-6 w-6" />
              </button>

              {/* User Account */}
              <button
                onClick={() =>
                  doNavigate(
                    userType === "vendor"
                      ? "vendor-dashboard"
                      : "customer-dashboard",
                  )
                }
                className="p-2 text-gray-600 hover:text-cyan-500 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
            </div>

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
            <div className="border-t border-gray-300 py-3 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => doNavigate("about")}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  About
                </button>
                <button
                  onClick={() => doNavigate("products")}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Shop
                </button>
                <button
                  onClick={() => doNavigate("products")}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Product
                </button>
                <button
                  onClick={() => doNavigate("about")}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  FAQs
                </button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => doNavigate("login")}
                  className="h-9 w-full"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => doNavigate("register")}
                  className="h-9 w-full bg-green-600 hover:bg-green-700"
                >
                  Register
                </Button>
              </div>
              <div className="mt-3 space-y-1 rounded-md border border-gray-300 bg-white p-2">
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

      {/* Navigation Bar */}
      <div className="relative hidden border-b bg-gray-100 md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center">
            {/* --- All Categories (Functional Dropdown) --- */}
            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex items-center space-x-2 bg-white px-4 py-2 rounded border transition-colors
                  ${
                    isCategoryOpen
                      ? "border-cyan-500 text-cyan-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                {isCategoryOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">All Categories</span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu Content */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl border border-gray-200 rounded-md z-50 overflow-visible">
                  <div className="py-1">
                    {CATEGORIES.map((category) => (
                      <div
                        key={category.id}
                        onMouseEnter={() => setActiveCategory(category.id)}
                        className="group static"
                      >
                        <button
                          onClick={() => {
                            doNavigate("products");
                            setIsCategoryOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-cyan-50 flex items-center justify-between group-hover:text-cyan-700 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <category.icon className="h-4 w-4 text-gray-400 group-hover:text-cyan-600" />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <ChevronRight className="h-3 w-3 text-gray-400" />
                        </button>

                        {/* Submenu (Flyout) - Amazon style */}
                        {activeCategory === category.id && (
                          <div className="absolute left-full top-0 w-64 h-full min-h-[300px] bg-white border border-l-0 border-gray-200 shadow-xl rounded-r-md -ml-[1px] z-50 hidden md:block">
                            <div className="p-4">
                              <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">
                                {category.name}
                              </h3>
                              <ul className="space-y-2">
                                {category.sub.map((item, idx) => (
                                  <li key={idx}>
                                    <button
                                      onClick={() => {
                                        doNavigate("products");
                                        setIsCategoryOpen(false);
                                      }}
                                      className="text-sm text-gray-600 hover:text-cyan-600 hover:translate-x-1 transition-all block w-full text-left"
                                    >
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* --------------------------- */}

            {/* Navigation Links (Kept exactly as requested) */}
            <nav className="flex space-x-8 ml-8 max-md:hidden">
              <button
                onClick={() => doNavigate("home")}
                className="text-gray-700 hover:text-cyan-500 transition-colors py-2 border-b-2 border-transparent hover:border-cyan-500"
              >
                Home
              </button>
              <button
                onClick={() => doNavigate("about")}
                className="text-gray-700 hover:text-cyan-500 transition-colors py-2 border-b-2 border-transparent hover:border-cyan-500"
              >
                About
              </button>
              <button
                onClick={() => doNavigate("products")}
                className="text-gray-700 hover:text-cyan-500 transition-colors py-2 border-b-2 border-transparent hover:border-cyan-500"
              >
                Shop
              </button>
              <button className="text-gray-700 hover:text-cyan-500 transition-colors py-2 border-b-2 border-transparent hover:border-cyan-500">
                Product
              </button>

              <button className="text-gray-700 hover:text-cyan-500 transition-colors py-2 border-b-2 border-transparent hover:border-cyan-500">
                FAQs
              </button>

              {/* Customer/Vendor/Admin Toggle */}
            </nav>
          </div>
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
