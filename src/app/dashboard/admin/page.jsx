"use client";

import { useEffect, useState } from "react";

import AdminStatsCard from "@/components/dashboard/admin/AdminStatsCard";
import MonthlySalesChart from "@/components/dashboard/admin/MonthlySalesChart";
import GenrePieChart from "@/components/dashboard/admin/GenrePieChart";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          statsRes,
          salesRes,
          genreRes,
        ] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/admin/stats`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/admin/monthly-sales`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/admin/genre-stats`
          ),
        ]);

        const stats = await statsRes.json();
        const sales = await salesRes.json();
        const genres = await genreRes.json();

        setStats(stats);
        setSalesData(sales);
        setGenreData(genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <p className="text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of users, writers, ebooks,
          sales and revenue.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <AdminStatsCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon="👥"
          color="blue"
        />

        <AdminStatsCard
          title="Total Writers"
          value={stats.totalWriters || 0}
          icon="✍️"
          color="green"
        />

        <AdminStatsCard
          title="Ebooks Sold"
          value={stats.totalSold || 0}
          icon="📚"
          color="purple"
        />

        <AdminStatsCard
          title="Revenue"
          value={`$${(
            (stats.totalRevenue || 0) 
          ).toFixed(2)}`}
          icon="💰"
          color="orange"
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <MonthlySalesChart
          data={salesData}
        />

        <GenrePieChart
          data={genreData}
        />

      </div>

    </div>
  );
}