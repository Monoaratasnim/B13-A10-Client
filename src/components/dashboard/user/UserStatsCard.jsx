"use client";

export default function UserStatsCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center hover:shadow-md transition">

      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      {icon && (
        <div className="text-3xl opacity-70">
          {icon}
        </div>
      )}
    </div>
  );
}