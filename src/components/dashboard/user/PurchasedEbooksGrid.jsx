"use client";

import Link from "next/link";

export default function PurchasedEbooksGrid({ ebooks }) {
  if (!ebooks || ebooks.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No purchased ebooks found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {ebooks.map((ebook) => (
        <Link key={ebook._id} href={`/ebooks/${ebook._id}`}>
          <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">

            <img
              src={ebook.coverImage}
              className="h-56 w-full object-cover"
              alt={ebook.title}
            />

            <div className="p-4">
              <h2 className="font-semibold line-clamp-2">
                {ebook.title}
              </h2>

              <p className="text-sm text-gray-500">
                {ebook.writerName || ebook.author}
              </p>

              <p className="mt-2 font-bold">
                ${ebook.price}
              </p>

              <span className="text-xs text-green-600 mt-2 inline-block">
                Purchased
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}