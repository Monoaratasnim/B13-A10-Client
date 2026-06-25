"use client";

export default function AdminStatsCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
    orange: "bg-orange-50 border-orange-100",
    pink: "bg-pink-50 border-pink-100",
    red: "bg-red-50 border-red-100",
  };

  return (
    <div
      className={`
        p-5 sm:p-6
        rounded-2xl
        border
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        ${colors[color] || colors.blue}
      `}
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm font-medium">
          {title}
        </p>

        <span className="text-2xl sm:text-3xl">
          {icon}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 break-words">
        {value}
      </h2>
    </div>
  );
}