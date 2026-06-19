"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* BRAND */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">Fable</h2>

            <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-sm mx-auto sm:mx-0">
              Discover, read, and publish ebooks from creators around the world.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center sm:justify-start gap-3 mt-5">

              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 hover:bg-rose-600 transition">
                <FaFacebookF />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 hover:bg-rose-600 transition">
                <FaTwitter />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 hover:bg-rose-600 transition">
                <FaInstagram />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 hover:bg-rose-600 transition">
                <FaLinkedinIn />
              </a>

              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-800 hover:bg-rose-600 transition">
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>

            <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto sm:mx-0">
              Subscribe to get latest ebook updates.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto sm:mx-0">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-stone-800 border border-stone-700 focus:outline-none focus:border-rose-500"
              />

              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg font-semibold transition whitespace-nowrap"
              >
                Subscribe
              </button>

            </form>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-stone-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Fable. All rights reserved.
        </div>

      </div>
    </footer>
  );
}