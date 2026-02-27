import React from "react";
import { Cart as CartComponent } from "../src/components/Cart";
import { useRouter } from "next/router";
import { useCart } from "../src/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity } = useCart();

  const navigateTo = (p: any) => {
    switch (p) {
      case "products":
        return router.push("/products");
      case "home":
        return router.push("/");
      default:
        return router.push("/");
    }
  };

  return (
    <CartComponent
      cartItems={cartItems}
      updateQuantity={updateQuantity}
      navigateTo={navigateTo}
    />
  );
}
