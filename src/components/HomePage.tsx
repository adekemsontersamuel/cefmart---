import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Truck, Shield, Clock, Star } from "lucide-react";
import { mockProducts, mockVendors, Product, Vendor } from "../App";
import type { Page } from "../types/navigation";
import { formatNaira } from "../utils/currency";
import { listProducts, listPublicVendors } from "../services/marketplace";

interface HomePageProps {
  navigateTo: (page: Page, productId?: string, category?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);

  useEffect(() => {
    const load = async () => {
      try {
        const [liveProducts, liveVendors] = await Promise.all([
          listProducts(),
          listPublicVendors(),
        ]);

        if (liveProducts.length > 0) setProducts(liveProducts);
        if (liveVendors.length > 0) setVendors(liveVendors);
      } catch {
        // Keep fallback mock data
      }
    };
    load();
  }, []);

  const categories = [
    { name: "Vegetables", icon: "🥕", count: "250+ items" },
    { name: "Fruits", icon: "🍎", count: "180+ items" },
    { name: "Grains", icon: "🌾", count: "95+ items" },
    { name: "Dairy", icon: "🥛", count: "45+ items" },
    { name: "Meat", icon: "🥩", count: "120+ items" },
    { name: "Herbs", icon: "🌿", count: "60+ items" },
  ];

  // Get different product sets
  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);
  const bestSellerProducts = useMemo(
    () =>
      products
    .filter((product) => product.reviews > 200)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 3),
    [products]
  );
  const recentProducts = useMemo(() => products.slice(-3), [products]);

  const features = [
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      title: "Fresh Delivery",
      description: "Farm-to-door delivery within 24 hours",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Assured",
      description: "All products verified and quality tested",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Always Fresh",
      description: "Direct from farms and trusted vendors",
    },
  ];

  return (
    <div className="space-y-14">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl tracking-tight">
                  Fresh From Farm
                  <span className="text-green-600"> To Your Table</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Connect directly with local farmers and trusted vendors. Get
                  the freshest produce, grains, and more delivered straight to
                  your doorstep.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigateTo("products")}
                  className="px-8 py-3"
                >
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3"
                  onClick={() => navigateTo("register")}
                >
                  Become a Vendor
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl">500+</div>
                  <div className="text-sm text-gray-600">Trusted Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">10k+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">24hrs</div>
                  <div className="text-sm text-gray-600">Fresh Guarantee</div>
                </div>
              </div>
            </div>

            <div className="relative max-w-md mx-auto">
              {" "}
              {/* Added max-w-md to stop it getting too huge */}
              <img
                src="/brand-lady.jpg"
                alt="Fresh farm produce"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-sm">4.9/5 Customer Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl">Shop by Category</h2>
            <p className="text-xl text-gray-600">
              Fresh produce, grains, and more from trusted local vendors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigateTo("products", undefined, category.name)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <h3 className="text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl">Featured Products</h2>
              <p className="text-xl text-gray-600 mt-2">
                Freshly harvested and ready for delivery
              </p>
            </div>
            <Button variant="outline" onClick={() => navigateTo("products")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigateTo("product-detail", product.id)}
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.vendor}</p>
                    </div>
                    <Badge variant="secondary">{product.freshness}</Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-xl">
                        {formatNaira(product.price)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.unit}
                      </div>
                    </div>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Seller Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl">Best Seller Products</h2>
              <p className="text-xl text-gray-600 mt-2">
                Most popular items loved by our customers
              </p>
            </div>
            <Button variant="outline" onClick={() => navigateTo("products")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellerProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow cursor-pointer relative"
                onClick={() => navigateTo("product-detail", product.id)}
              >
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-red-500 hover:bg-red-600">
                    🔥 Best Seller
                  </Badge>
                </div>
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.vendor}</p>
                    </div>
                    <Badge variant="secondary">{product.freshness}</Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-xl">
                        {formatNaira(product.price)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.unit}
                      </div>
                    </div>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Added Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl">Recently Added Products</h2>
              <p className="text-xl text-gray-600 mt-2">
                Fresh additions to our marketplace
              </p>
            </div>
            <Button variant="outline" onClick={() => navigateTo("products")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-shadow cursor-pointer relative"
                onClick={() => navigateTo("product-detail", product.id)}
              >
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    ✨ New
                  </Badge>
                </div>
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.vendor}</p>
                    </div>
                    <Badge variant="secondary">{product.freshness}</Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-xl">
                        {formatNaira(product.price)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.unit}
                      </div>
                    </div>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl">Why Choose Cefmart?</h2>
            <p className="text-xl text-gray-600">
              We make it easy to get fresh, quality produce directly from local
              sources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl">Trusted AgriPartners</h2>
            <p className="text-xl text-gray-600">
              Meet some of our verified vendors committed to quality and
              freshness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <div>
                    <h3 className="text-xl">{vendor.name}</h3>
                    <p className="text-gray-600 capitalize">
                      {vendor.type} • {vendor.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{vendor.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {vendor.products} products
                    </div>
                    {vendor.verified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
