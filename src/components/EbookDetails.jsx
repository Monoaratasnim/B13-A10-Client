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

  const userEmail = session?.user?.email;

  const isWriter =
    ebook?.writerEmail && userEmail
      ? ebook.writerEmail === userEmail
      : false;

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
    if (!userEmail || !ebook?._id) return;

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
  }, [ebook?._id, userEmail]);

  // ================= BOOKMARK =================
  const handleBookmark = async () => {
    try {
      if (!userEmail) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/bookmarks`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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

  // ================= STRIPE BUY =================
  const handleBuy = async () => {
    try {
      if (!userEmail) {
        alert("Please login first");
        return;
      }

      if (isWriter) {
        alert("Writer cannot buy their own ebook");
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
          headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="bg-gray-100 flex items-center justify-center p-6">
            {!imgLoaded && (
              <div className="w-full h-[420px] animate-pulse bg-gray-200 rounded-xl" />
            )}

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={ebook.coverImage}
              alt={ebook.title}
              onLoad={() => setImgLoaded(true)}
              className="w-full max-w-sm h-[420px] object-cover rounded-xl shadow-md"
            />
          </div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 sm:p-10 flex flex-col justify-center"
          >
            <h1 className="text-3xl font-bold">{ebook.title}</h1>

            <p className="text-gray-500 mt-2">
              By {ebook.writerEmail}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <p><b>Genre:</b> {ebook.genre}</p>
              <p><b>Price:</b> ${ebook.price}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    alreadyPurchased
                      ? "text-blue-600"
                      : ebook.sold
                      ? "text-red-500"
                      : "text-green-600"
                  }
                >
                  {alreadyPurchased
                    ? "Purchased"
                    : ebook.sold
                    ? "Sold"
                    : "Available"}
                </span>
              </p>

              <p>
                <b>Date:</b>{" "}
                {ebook.createdAt
                  ? new Date(ebook.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-600 mt-2">
                {ebook.description || "No description available."}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex gap-3">

              {/* BOOKMARK */}
              <button
                onClick={handleBookmark}
                disabled={loading}
                className={`px-5 py-3 rounded-lg border transition ${
                  bookmarked
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {loading
                  ? "Loading..."
                  : bookmarked
                  ? "Bookmarked ✓"
                  : "Bookmark"}
              </button>

              {/* BUY NOW */}
              <button
                onClick={handleBuy}
                disabled={isWriter || buyLoading || alreadyPurchased}
                className="px-5 py-3 rounded-lg bg-rose-500 text-white disabled:opacity-50"
              >
                {buyLoading
                  ? "Processing..."
                  : isWriter
                  ? "You are writer"
                  : alreadyPurchased
                  ? "Already Purchased"
                  : ebook.sold
                  ? "Sold Out"
                  : "Buy Now"}
              </button>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}