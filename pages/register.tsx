import React from "react";
import { Register } from "../src/components/Register";
import { useRouter } from "next/router";
import type { Page } from "../src/types/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const navigateTo = (page: Page) => {
    switch (page) {
      case "home":
        return router.push("/");
      case "vendor-dashboard":
        return router.push("/vendor");
      case "customer-dashboard":
        return router.push("/customer");
      case "login":
        return router.push("/login");
      default:
        return router.push("/");
    }
  };

  return <Register navigateTo={navigateTo} />;
}
