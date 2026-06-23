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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/writer/stats`
        );

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [session]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
        <div className="grid md:grid-cols-3 gap-4">
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-28 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">
          Welcome Writer 👋 {session?.user?.name}
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your ebooks, sales & revenue
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">

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
          value={`$${stats.totalRevenue}`}
          color="purple"
          icon="📈"
        />

      </div>

      {/* ACTIONS */}
      <div className="grid md:grid-cols-3 gap-4">

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
          href="/dashboard/writer/sales-history"
          className="bg-green-600 text-white p-5 rounded-xl text-center hover:bg-green-700 transition"
        >
          💰 Sales History
        </Link>

      </div>

    </div>
  );
}