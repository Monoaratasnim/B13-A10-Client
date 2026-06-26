"use client";

import Image from "next/image";
import { FaAward, FaBookOpen, FaMedal } from "react-icons/fa";

export default function TopWriterCard({ writer, index }) {
  const defaultAvatars = [
    "/images/writer1.jpg",
    "/images/writer3.jpg",
    "/images/writer2.jpg",
  ];

  const avatar =
    writer.avatar ||
    defaultAvatars[index] ||
    defaultAvatars[0];

  const rankInfo = [
    {
      badge: "🥇 #1 Writer",
      color: "from-yellow-400 to-amber-500",
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
    {
      badge: "🥈 #2 Writer",
      color: "from-gray-400 to-gray-500",
      bg: "bg-gray-100",
      text: "text-gray-700",
    },
    {
      badge: "🥉 #3 Writer",
      color: "from-orange-400 to-orange-500",
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
  ];

  const rank = rankInfo[index] || rankInfo[2];

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        border
        overflow-hidden
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* Header */}

      <div
        className={`
          h-24
          bg-gradient-to-r
          ${rank.color}
          relative
        `}
      >
        <div className="absolute left-1/2 -bottom-12 -translate-x-1/2">
          <Image
            src={avatar}
            alt={writer.writerName}
            width={100}
            height={100}
          className="
  rounded-full
  border-4
  border-white
  object-cover
  object-top
  w-24
  h-24
  md:w-28
  md:h-28
  shadow-lg
"
          />
        </div>
      </div>

      {/* Body */}

      <div className="pt-16 pb-8 px-6 text-center">

        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
          {writer.writerName}
        </h3>

        <p className="text-sm text-gray-500 break-all mt-2">
          {writer.writerEmail}
        </p>

        {/* Rank */}

        <div
          className={`
            inline-flex
            items-center
            gap-2
            mt-5
            px-4
            py-2
            rounded-full
            ${rank.bg}
            ${rank.text}
          `}
        >
          <FaAward />

          <span className="font-semibold">
            {rank.badge}
          </span>
        </div>

        {/* Sales */}

        <div className="mt-8 flex justify-center">

          <div
            className="
              flex
              items-center
              gap-4
              bg-slate-50
              rounded-2xl
              px-6
              py-4
              border
            "
          >
            <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
              <FaBookOpen className="text-rose-500 text-xl" />
            </div>

            <div className="text-left">
              <h4 className="text-2xl font-bold text-gray-900">
                {writer.totalSales}
              </h4>

              <p className="text-sm text-gray-500">
                Ebook Sales
              </p>
            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-amber-500">
            <FaMedal />
            <span className="text-sm font-medium">
              Featured Writer
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}