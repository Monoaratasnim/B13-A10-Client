"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminStatsCard from "@/components/dashboard/admin/AdminStatsCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWriters: 0,
    totalAdmins: 0,
    totalEbooks: 0,
    totalSold: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/stats`
        );

        const data = await res.json();

        setStats(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Platform analytics and management
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

        <AdminStatsCard
          title="Users"
          value={stats.totalUsers}
          icon="👤"
          color="blue"
        />

        <AdminStatsCard
          title="Writers"
          value={stats.totalWriters}
          icon="✍️"
          color="green"
        />

        <AdminStatsCard
          title="Admins"
          value={stats.totalAdmins}
          icon="🛡️"
          color="purple"
        />

        <AdminStatsCard
          title="Total Ebooks"
          value={stats.totalEbooks}
          icon="📚"
          color="orange"
        />

        <AdminStatsCard
          title="Sold Ebooks"
          value={stats.totalSold}
          icon="🔥"
          color="red"
        />

        <AdminStatsCard
          title="Revenue"
          value={`$${(
            stats.totalRevenue / 100
          ).toFixed(2)}`}
          icon="💰"
          color="pink"
        />

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Link
          href="/dashboard/admin/manage-users"
          className="bg-blue-600 text-white p-5 rounded-xl text-center hover:bg-blue-700 transition"
        >
          👥 Manage Users
        </Link>

        <Link
          href="/dashboard/admin/manage-ebooks"
          className="bg-green-600 text-white p-5 rounded-xl text-center hover:bg-green-700 transition"
        >
          📚 Manage Ebooks
        </Link>

        <Link
          href="/dashboard/admin/transactions"
          className="bg-purple-600 text-white p-5 rounded-xl text-center hover:bg-purple-700 transition"
        >
          💳 Transactions
        </Link>

      </div>

      {/* Analytics Placeholder */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-3">
          Analytics
        </h2>

        <div className="h-80 rounded-xl bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">
            Monthly Sales Chart & Genre Pie Chart
          </p>
        </div>
      </div>

    </div>
  );
}