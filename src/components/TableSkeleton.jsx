export default function TableSkeleton({
  rows = 6,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {[1, 2, 3, 4, 5].map((item) => (
              <th
                key={item}
                className="px-6 py-4"
              >
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map(
            (_, index) => (
              <tr
                key={index}
                className="border-t"
              >
                {[1, 2, 3, 4, 5].map((cell) => (
                  <td
                    key={cell}
                    className="px-6 py-5"
                  >
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}