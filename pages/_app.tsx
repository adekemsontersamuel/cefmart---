import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import "../src/index.css";
import { Header } from "../src/components/Header";
import { CartProvider, useCartSafe } from "../src/context/CartContext";

type AppShellProps = Pick<AppProps, "Component" | "pageProps">;

const AppShell = ({ Component, pageProps }: AppShellProps) => {
  const router = useRouter();
  const cart = useCartSafe();
  const [userType, setUserType] = useState<"customer" | "vendor">("customer");
  const cartItemsCount = useMemo(
    () =>
      cart?.cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0,
    [cart?.cartItems]
  );
  const hideHeaderRoutes = new Set(["/login", "/register"]);
  const hideHeader = hideHeaderRoutes.has(router.pathname);

  return (
    <>
      {!hideHeader && (
        <Header
          navigateTo={() => {}}
          cartItemsCount={cartItemsCount}
          userType={userType}
          setUserType={setUserType}
        />
      )}
      <Component {...pageProps} />
    </>
  );
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <AppShell Component={Component} pageProps={pageProps} />
    </CartProvider>
  );
}
