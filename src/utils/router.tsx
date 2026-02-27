import React, { createContext, useContext, useState, ReactNode } from "react";

export type PageKey =
  | "home"
  | "login"
  | "register"
  | "products"
  | "product"
  | "cart"
  | "admin"
  | "vendor"
  | "customer";

export type RouterContextType = {
  page: PageKey;
  setPage: (p: PageKey) => void;
  pageProps?: any;
  setPageProps: (p?: any) => void;
};

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined
);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<PageKey>("home");
  const [pageProps, setPageProps] = useState<any>(undefined);

  return (
    <RouterContext.Provider value={{ page, setPage, pageProps, setPageProps }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouterState = () => {
  const ctx = useContext(RouterContext);
  if (!ctx)
    throw new Error("useRouterState must be used within RouterProvider");
  return ctx;
};

// Safe hook that returns undefined when not wrapped in RouterProvider
export const useRouterStateSafe = () => useContext(RouterContext);
