"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function WriterBookmarksPage() {
  const { data: session } = authClient.useSession();

  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/my-bookmarks?email=${session.user.email}`
        );

        const data = await res.json();

        setEbooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Bookmark fetch error:", error);
        setEbooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [session?.user?.email]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Bookmarked Ebooks
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            All ebooks you saved for later reading
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-72 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && ebooks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-700">
              No bookmarks found
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Start saving ebooks you like for quick access later.
            </p>

            <Link
              href="/ebooks"
              className="inline-block mt-5 px-6 py-3 rounded-lg bg-black text-white text-sm sm:text-base"
            >
              Browse Ebooks
            </Link>
          </div>
        )}

        {/* GRID */}
        {!loading && ebooks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {ebooks.map((ebook) => (
              <Link
                key={ebook._id}
                href={`/ebooks/${ebook._id}`}
                className="group"
              >
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 h-full flex flex-col">

                  {/* IMAGE */}
                  <div className="relative w-full h-44 sm:h-52 overflow-hidden">
                    <img
                      src={
                        ebook.coverImage ||
                        "https://via.placeholder.com/400x600"
                      }
                      alt={ebook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h2 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-900">
                      {ebook.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {ebook.writerEmail}
                    </p>

                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <p className="font-semibold text-sm sm:text-base">
                        ${ebook.price}
                      </p>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          ebook.sold
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {ebook.sold ? "Sold" : "Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}