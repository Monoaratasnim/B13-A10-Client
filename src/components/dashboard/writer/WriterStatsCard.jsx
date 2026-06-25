"use client";

export default function WriterStatsCard({
  title,
  value,
  icon,
  color,
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
  };

  return (
    <div
      className={`
        border
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-md
        transition
        ${colors[color]}
      `}
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <span className="text-3xl">
          {icon}
        </span>
      </div>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}