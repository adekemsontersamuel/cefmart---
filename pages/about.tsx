import React from "react";
import AboutPage from "../src/components/AboutPage";
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();
  const navigateTo = (page: string) => {
    router.push(page);
  };

  return (
    <AboutPage
      navigateTo={(p: any) => {
        // map p (Page keys) to paths if needed
        if (p === "products") return navigateTo("/products");
        if (p === "register") return navigateTo("/register");
        return navigateTo("/");
      }}
    />
  );
}
