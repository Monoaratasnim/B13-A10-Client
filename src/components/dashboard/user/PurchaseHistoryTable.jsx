"use client";

export default function PurchaseHistoryTable({ data = [] }) {
  if (!data.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No purchase history found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full text-sm text-left">

        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Ebook</th>
            <th className="p-3">Writer</th>
            <th className="p-3">Price</th>
            <th className="p-3">Amount Paid</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b">

              <td className="p-3 font-medium">
                {item.ebookTitle}
              </td>

              <td className="p-3 text-gray-600">
                {item.writer}
              </td>

              <td className="p-3">
                ${item.price}
              </td>

              <td className="p-3 font-semibold text-green-600">
                ${(item.amount / 100).toFixed(2)}
              </td>

              <td className="p-3 text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  Paid
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}