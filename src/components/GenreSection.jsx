"use client";

import Link from "next/link";
import {
  FaBookOpen,
  FaUserSecret,
  FaHeart,
  FaRocket,
  FaDragon,
  FaGhost,
  FaBolt,
  FaFeatherAlt,
  FaBrain,
  FaMask,
} from "react-icons/fa";

const genres = [
  {
    name: "Fiction",
    icon: <FaBookOpen />,
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Mystery",
    icon: <FaUserSecret />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Romance",
    icon: <FaHeart />,
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Sci-Fi",
    icon: <FaRocket />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Fantasy",
    icon: <FaDragon />,
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    name: "Horror",
    icon: <FaGhost />,
    color: "from-gray-700 to-black",
  },
  {
    name: "Thriller",
    icon: <FaBolt />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Biography",
    icon: <FaFeatherAlt />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Self Development",
    icon: <FaBrain />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Poetry",
    icon: <FaMask />,
    color: "from-violet-500 to-purple-500",
  },
];

export default function GenreSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}

        <div className="text-center mb-14">
          <span className="text-rose-500 font-semibold uppercase tracking-wider">
            Find Your Favorite
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Explore Ebook Genres
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Browse ebooks by category and discover stories,
            knowledge, and adventures you'll love.
          </p>
        </div>

        {/* Genre Grid */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

          {genres.map((genre) => (

            <Link
              key={genre.name}
              href={`/browse?genre=${encodeURIComponent(genre.name)}`}
              className="
                group
                rounded-3xl
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >

              <div
                className={`bg-gradient-to-r ${genre.color} p-8 text-white text-center`}
              >

                <div className="text-5xl mb-5 group-hover:scale-110 transition">
                  {genre.icon}
                </div>

                <h3 className="font-bold text-lg">
                  {genre.name}
                </h3>

                <p className="mt-2 text-sm opacity-90">
                  Explore →
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}