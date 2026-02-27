import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CustomerDashboard } from "../src/components/CustomerDashboard";
import { resolveCurrentUserRole } from "../src/services/marketplace";

export default function CustomerPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { role } = await resolveCurrentUserRole();
      if (role !== "customer") {
        router.replace("/login");
        return;
      }
      setReady(true);
    };
    check();
  }, [router]);

  if (!ready) return <div className="p-8">Checking access...</div>;

  return (
    <CustomerDashboard
      navigateTo={(page) => {
        if (page === "home") return router.push("/");
        if (page === "products") return router.push("/products");
        return router.push("/customer");
      }}
    />
  );
}
