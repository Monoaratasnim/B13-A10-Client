"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function BookmarkPage() {
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
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          My Bookmarked Ebooks
        </h1>

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              Loading bookmarks...
            </p>
          </div>
        )}

        {!loading && ebooks.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700">
              No bookmarks found
            </h2>

            <p className="text-gray-500 mt-2">
              Start bookmarking your favorite ebooks.
            </p>

            <Link
              href="/ebooks"
              className="inline-block mt-5 px-5 py-3 rounded-lg bg-black text-white"
            >
              Browse Ebooks
            </Link>
          </div>
        )}

        {!loading && ebooks.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {ebooks.map((ebook) => (
              <Link
                key={ebook._id}
                href={`/ebooks/${ebook._id}`}
              >
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
                  <img
                    src={
                      ebook.coverImage ||
                      "https://via.placeholder.com/400x600"
                    }
                    alt={ebook.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-4">
                    <h2 className="font-semibold line-clamp-2">
                      {ebook.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {ebook.author}
                    </p>

                    <p className="mt-2 font-medium">
                      ${ebook.price}
                    </p>

                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                        ebook.sold
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {ebook.sold
                        ? "Sold Out"
                        : "Available"}
                    </span>
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