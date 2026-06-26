"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import WriterStatsCard from "@/components/dashboard/writer/WriterStatsCard";

export default function WriterDashboard() {
  const { data: session } = authClient.useSession();

  const [stats, setStats] = useState({
    totalEbooks: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/writer/stats?email=${session.user.email}`
        );

        const data = await res.json();

        setStats({
          totalEbooks: data.totalEbooks || 0,
          totalSales: data.totalSales || 0,
          totalRevenue: data.totalRevenue || 0,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome Writer 👋 {session?.user?.name}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Manage your ebooks, sales & revenue
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <WriterStatsCard
          title="Total Ebooks"
          value={stats.totalEbooks}
          color="blue"
          icon="📚"
        />

        <WriterStatsCard
          title="Total Sales"
          value={stats.totalSales}
          color="green"
          icon="💰"
        />

        <WriterStatsCard
          title="Total Revenue"
       value={`$${stats.totalRevenue.toFixed(2)}`}
          color="purple"
          icon="📈"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link
          href="/dashboard/writer/add-ebook"
          className="bg-black text-white p-5 rounded-xl text-center hover:bg-gray-800 transition"
        >
          ➕ Add Ebook
        </Link>

        <Link
          href="/dashboard/writer/manage-ebooks"
          className="bg-blue-600 text-white p-5 rounded-xl text-center hover:bg-blue-700 transition"
        >
          📚 Manage Ebooks
        </Link>

        <Link
          href="/dashboard/writer/bookmarks"
          className="bg-purple-600 text-white p-5 rounded-xl text-center hover:bg-purple-700 transition"
        >
          🔖 Bookmarks
        </Link>

        <Link
          href="/dashboard/writer/sales-history"
          className="bg-green-600 text-white p-5 rounded-xl text-center hover:bg-green-700 transition"
        >
          💰 Sales History
        </Link>
      </div>
    </div>
  );
}