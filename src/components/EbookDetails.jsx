"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function EbookDetails({ ebook }) {
  const { data: session } = authClient.useSession();

  const [imgLoaded, setImgLoaded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);
  const [role, setRole] = useState(null);

  const userEmail = session?.user?.email;

  const isWriter =
    ebook?.writerEmail && userEmail
      ? ebook.writerEmail === userEmail
      : false;

  const isAdmin = role === "admin";

  // ================= ROLE =================
  useEffect(() => {
    if (!userEmail) return;

    const loadRole = async () => {
      try {
        const res = await fetch("/api/user/role");
        const data = await res.json();

        setRole(data.role);
      } catch (err) {
        console.log(err);
      }
    };

    loadRole();
  }, [userEmail]);

  // ================= CHECK PURCHASE =================
  useEffect(() => {
    if (!userEmail || !ebook?._id) return;

    const checkPurchase = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/check-purchase?ebookId=${ebook._id}&email=${userEmail}`
        );

        const data = await res.json();

        setAlreadyPurchased(!!data?.purchased);
      } catch (err) {
        console.log(err);
      }
    };

    checkPurchase();
  }, [ebook?._id, userEmail]);

  // ================= CHECK BOOKMARK =================
  useEffect(() => {
    if (!userEmail || !ebook?._id || isAdmin) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/my-bookmarks?email=${userEmail}`
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          const exists = data.some(
            (b) => String(b._id) === String(ebook._id)
          );

          setBookmarked(exists);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookmarks();
  }, [ebook?._id, userEmail, isAdmin]);

  // ================= BOOKMARK =================
  const handleBookmark = async () => {
    try {
      if (!userEmail) {
        alert("Please login first");
        return;
      }

      if (isAdmin) {
        alert("Admin cannot bookmark ebooks");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/bookmarks`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            ebookId: ebook._id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Bookmark failed");
        return;
      }

      setBookmarked(data.bookmarked);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= BUY =================
  const handleBuy = async () => {
    try {
      if (!userEmail) {
        alert("Please login first");
        return;
      }

      if (isAdmin) {
        alert("Admin cannot purchase ebooks");
        return;
      }

      if (isWriter) {
        alert("Writer cannot buy own ebook");
        return;
      }

      if (alreadyPurchased) {
        alert("Already purchased");
        return;
      }

      setBuyLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ebookId: ebook._id,
            userEmail,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment failed");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.log(err);
      alert("Payment error");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-slate-50 py-6 md:py-10 px-4">
    <div className="max-w-7xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">

        <div className="grid lg:grid-cols-2 gap-0">

          {/* IMAGE SECTION */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-10 flex justify-center items-start">

            <div className="w-full max-w-md lg:sticky lg:top-8">

              {!imgLoaded && (
                <div className="w-full h-[500px] rounded-2xl bg-gray-300 animate-pulse" />
              )}

              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={ebook.coverImage}
                alt={ebook.title}
                onLoad={() => setImgLoaded(true)}
                className="
                  w-full
                  h-[420px]
                  sm:h-[500px]
                  object-cover
                  rounded-2xl
                  shadow-2xl
                  border
                "
              />
            </div>

          </div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 md:p-10"
          >

            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {ebook.title}
            </h1>

            <p className="mt-3 text-gray-500 text-sm md:text-base">
              Written by{" "}
              <span className="font-semibold text-gray-700">
                {ebook.writerName}
              </span>
            </p>

            {/* INFO CARDS */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-slate-50 border rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Genre
                </p>
                <h4 className="font-semibold mt-1">
                  {ebook.genre}
                </h4>
              </div>

              <div className="bg-slate-50 border rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Price
                </p>
                <h4 className="font-semibold mt-1">
                  ${ebook.price}
                </h4>
              </div>

              <div className="bg-slate-50 border rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <h4
                  className={`font-semibold mt-1 ${
                    alreadyPurchased
                      ? "text-blue-600"
                      : ebook.sold
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {alreadyPurchased
                    ? "Purchased"
                    : ebook.sold
                    ? "Sold"
                    : "Available"}
                </h4>
              </div>

              <div className="bg-slate-50 border rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Uploaded
                </p>

                <h4 className="font-semibold mt-1">
                  {new Date(
                    ebook.createdAt
                  ).toLocaleDateString()}
                </h4>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Description
              </h3>

              <div
                className="
                  bg-gray-50
                  border
                  rounded-2xl
                  p-5
                  max-h-[350px]
                  overflow-y-auto
                "
              >
                <p className="text-gray-700 whitespace-pre-line leading-8 text-sm md:text-base">
                  {ebook.description}
                </p>
              </div>

            </div>

            {/* ACTION BUTTONS */}
            {!isAdmin && (
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <button
                  onClick={handleBookmark}
                  disabled={loading}
                  className={`
                    w-full
                    sm:w-auto
                    px-6
                    py-3
                    rounded-xl
                    border
                    font-medium
                    transition
                    ${
                      bookmarked
                        ? "bg-black text-white"
                        : "bg-white hover:bg-gray-100"
                    }
                  `}
                >
                  {loading
                    ? "Loading..."
                    : bookmarked
                    ? "Bookmarked ✓"
                    : "Bookmark"}
                </button>

                <button
                  onClick={handleBuy}
                  disabled={
                    isWriter ||
                    buyLoading ||
                    alreadyPurchased
                  }
                  className="
                    w-full
                    sm:w-auto
                    px-6
                    py-3
                    rounded-xl
                    bg-rose-500
                    hover:bg-rose-600
                    text-white
                    font-medium
                    transition
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {buyLoading
                    ? "Processing..."
                    : isWriter
                    ? "You are Writer"
                    : alreadyPurchased
                    ? "Already Purchased"
                    : ebook.sold
                    ? "Sold Out"
                    : "Buy Now"}
                </button>

              </div>
            )}

            {/* ADMIN MESSAGE */}
            {isAdmin && (
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                <p className="text-yellow-700 font-medium">
                  Admin accounts can manage ebooks but cannot purchase or bookmark ebooks.
                </p>
              </div>
            )}

          </motion.div>

        </div>
      </div>
    </div>
  </div>
);
}