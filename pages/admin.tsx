import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdminDashboard } from "../src/components/AdminDashboard";
import { resolveCurrentUserRole } from "../src/services/marketplace";

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { role } = await resolveCurrentUserRole();
      if (role !== "admin") {
        router.replace("/login");
        return;
      }
      setReady(true);
    };
    check();
  }, [router]);

  if (!ready) return <div className="p-8">Checking access...</div>;

  return (
    <AdminDashboard
      navigateTo={(page) => {
        if (page === "home") return router.push("/");
        return router.push("/admin");
      }}
    />
  );
}
