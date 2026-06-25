"use client";

import Link from "next/link";

export default function EbookCard({ ebook }) {
  return (
    <Link href={`/ebooks/${ebook._id}`}>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={ebook.coverImage}
            alt={ebook.title}
            className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition duration-500"
          />

          {ebook.sold && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Sold
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4">

          <h3 className="font-bold text-gray-900 line-clamp-1 text-sm sm:text-base">
            {ebook.title}
          </h3>

          <p className="text-gray-500 text-sm mt-1 line-clamp-1">
            By {ebook.writerName}
          </p>

          <div className="flex justify-between items-center mt-4">

            <span className="text-rose-600 font-bold text-lg">
              ${ebook.price}
            </span>

            <button className="text-sm bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition">
              View
            </button>

          </div>
        </div>
      </div>
    </Link>
  );
}