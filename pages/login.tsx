import React from "react";
import { Login } from "../src/components/Login";
import { useRouter } from "next/router";
import type { Page } from "../src/types/navigation";

export default function LoginPage() {
  const router = useRouter();

  const navigateTo = (page: Page) => {
    switch (page) {
      case "home":
        return router.push("/");
      case "register":
        return router.push("/register");
      case "products":
        return router.push("/products");
      case "customer-dashboard":
        return router.push("/customer");
      case "vendor-dashboard":
        return router.push("/vendor");
      case "admin-dashboard":
        return router.push("/admin");
      default:
        return router.push("/");
    }
  };

  return <Login navigateTo={navigateTo} />;
}
