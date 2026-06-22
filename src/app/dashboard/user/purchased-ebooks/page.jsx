"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import PurchasedEbooksGrid from "@/components/dashboard/user/PurchasedEbooksGrid";

export default function PurchasedEbooksPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/user/purchased-ebooks`
        );

        const data = await res.json();
        setEbooks(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [session]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-72 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-5">
      <h1 className="text-2xl font-bold">
        My Purchased Ebooks
      </h1>

      <PurchasedEbooksGrid ebooks={ebooks} />
    </div>
  );
}