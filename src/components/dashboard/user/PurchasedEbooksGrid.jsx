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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {ebooks.map((ebook) => (
        <Link
          key={ebook._id}
          href={`/ebooks/${ebook._id}`}
          className="group"
        >
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden h-[300px] flex flex-col">

            {/* Image */}
            <img
              src={ebook.coverImage}
              alt={ebook.title}
              className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Content */}
            <div className="p-3 flex flex-col flex-1">

              <h2
                className="font-semibold text-sm truncate"
                title={ebook.title}
              >
                {ebook.title}
              </h2>

              <p
                className="text-xs text-gray-500 truncate mt-1"
                title={ebook.writerName || ebook.author}
              >
                {ebook.writerName || ebook.author}
              </p>

              <div className="mt-auto">
                <p className="text-base font-bold text-blue-600">
                  ${ebook.price}
                </p>

                <span className="inline-flex mt-2 px-2 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-medium">
                  Purchased
                </span>
              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}