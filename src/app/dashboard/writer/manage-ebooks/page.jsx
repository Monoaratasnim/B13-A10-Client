"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import EbookManageTable from "@/components/dashboard/writer/EbookManageTable";

export default function ManageEbooksPage() {
  const { data: session } = authClient.useSession();

  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/writer/ebooks?email=${session?.user?.email}`
      );

      const data = await res.json();

      setEbooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchBooks();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Manage Ebooks
        </h1>

        <p className="text-gray-500">
          Manage all your uploaded ebooks
        </p>
      </div>

      <EbookManageTable
        ebooks={ebooks}
        refresh={fetchBooks}
      />
    </div>
  );
}