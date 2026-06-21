"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EbookCard({ ebook }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl"
    >
      <Link href={`/ebooks/${ebook._id}`}>
        <div className="overflow-hidden">
          <img
            src={ebook.coverImage}
            alt={ebook.title}
            className="h-56 w-full object-cover transition duration-300 group-hover:scale-110"
          />
        </div>

        <div className="p-4">
          <h2 className="line-clamp-1 text-lg font-semibold">
            {ebook.title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {ebook.author}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-bold text-rose-500">
              ${ebook.price}
            </p>

            {ebook.sold && (
              <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
                Sold
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}