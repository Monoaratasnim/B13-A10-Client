"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditEbookForm from "@/components/dashboard/writer/EditEbookForm";

export default function EditEbookPage() {
  const params = useParams();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/writer/ebooks/${params.id}`
        );

        const data = await res.json();
        setEbook(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchBook();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 animate-pulse rounded" />
        <div className="h-96 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="bg-white rounded-xl p-10 text-center">
        Ebook not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Ebook
        </h1>

        <p className="text-gray-500 mt-1">
          Update your ebook information
        </p>
      </div>

      <EditEbookForm ebook={ebook} />
    </div>
  );
}

