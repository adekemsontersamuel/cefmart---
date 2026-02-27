import React from "react";
import { useRouter } from "next/router";
import { HomePage } from "../src/components/HomePage";
import { Footer } from "../src/components/Footer";

export default function Home() {
  const router = useRouter();
  const navigateTo = (page: string, productId?: string, category?: string) => {
    if (page === "products") {
      if (category) return router.push(`/products?category=${encodeURIComponent(category)}`);
      return router.push("/products");
    }
    if (page === "product-detail" && productId)
      return router.push(`/product/${productId}`);
    if (page === "register") return router.push("/register");
    if (page === "cart") return router.push("/cart");
    if (page === "about") return router.push("/about");
    return router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HomePage navigateTo={navigateTo as any} />
      </main>

      <Footer />
    </div>
  );
}
