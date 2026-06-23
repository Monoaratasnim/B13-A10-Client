export default function WriterStatsCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
  };

  return (
    <div className={`border rounded-xl p-5 hover:shadow transition ${colors[color]}`}>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>

      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}