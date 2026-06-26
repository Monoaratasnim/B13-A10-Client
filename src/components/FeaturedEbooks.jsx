"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EbookCard from "@/components/EbookCard";
import EbookSkeleton from "@/components/EbookSkeleton";

export default function FeaturedEbooks() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/ebooks/featured`
        );

        const data = await res.json();

        setEbooks(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="text-rose-500 font-semibold">
              Featured Collection
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Featured Ebooks
            </h2>

            <p className="text-gray-500 mt-3 max-w-2xl">
              Explore some of the most popular and recently published
              ebooks from talented writers around the world.
            </p>
          </div>

          <Link
            href="/browse"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            View All Ebooks
          </Link>
        </div>

        {/* Loading */}

       {loading && (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <EbookSkeleton key={i} />
    ))}
  </div>
)}

        {/* Books */}

        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {ebooks.map((ebook) => (
              <EbookCard
                key={ebook._id}
                ebook={ebook}
              />
            ))}
          </div>
        )}

        {/* Empty State */}

        {!loading && ebooks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No featured ebooks found.
          </div>
        )}
      </div>
    </section>
  );
}