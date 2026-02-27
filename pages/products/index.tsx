import React, { useEffect, useState } from "react";
import { ProductListing } from "../../src/components/ProductListing";
import { useRouter } from "next/router";
import { useCart } from "../../src/context/CartContext";
import { listProducts } from "../../src/services/marketplace";
import type { Product } from "../../src/App";

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = async () => {
      const category =
        typeof router.query.category === "string" ? router.query.category : "";
      const rows = await listProducts(category || undefined);
      setProducts(rows);
    };
    load();
  }, [router.query.category]);

  const navigateTo = (page: string, productId?: string) => {
    if (page === "product-detail" && productId)
      return router.push(`/product/${productId}`);
    if (page === "home") return router.push("/");
    return router.push("/");
  };

  return (
    <ProductListing
      navigateTo={navigateTo as any}
      category={typeof router.query.category === "string" ? router.query.category : ""}
      addToCart={addToCart}
      products={products}
    />
  );
}
