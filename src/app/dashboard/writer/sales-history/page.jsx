"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import SalesHistoryTable from "@/components/dashboard/writer/SalesHistoryTable";

export default function SalesHistoryPage() {
  const { data: session } = authClient.useSession();

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  const fetchSales = async () => {
    if (!email) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/writer/sales?email=${email}`
      );

      const data = await res.json();

      setSales(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchSales();
    }
  }, [email]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-16 bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-80 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Sales History
        </h1>

        <p className="text-gray-500 mt-1">
          View all ebook sales and revenue records
        </p>
      </div>

      <SalesHistoryTable sales={sales} />
    </div>
  );
}