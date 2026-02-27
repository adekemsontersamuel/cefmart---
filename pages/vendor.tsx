import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { VendorDashboard } from "../src/components/VendorDashboard";
import { resolveCurrentUserRole } from "../src/services/marketplace";

export default function VendorPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { role } = await resolveCurrentUserRole();
      if (role !== "vendor") {
        router.replace("/login");
        return;
      }
      setReady(true);
    };
    check();
  }, [router]);

  if (!ready) return <div className="p-8">Checking access...</div>;

  return (
    <VendorDashboard
      navigateTo={(page) => {
        if (page === "home") return router.push("/");
        if (page === "products") return router.push("/products");
        return router.push("/vendor");
      }}
    />
  );
}
