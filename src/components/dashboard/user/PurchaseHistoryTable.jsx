"use client";

export default function PurchaseHistoryTable({ data = [] }) {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
        No purchase history found.
      </div>
    );
  }

  return (
    <>
      {/* ================= Desktop Table ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-4">Ebook</th>
                <th className="px-6 py-4">Writer</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Amount Paid</th>
                <th className="px-6 py-4">Purchase Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td
                    className="px-6 py-4 font-medium max-w-[220px] truncate"
                    title={item.ebookTitle}
                  >
                    {item.ebookTitle}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.writer}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    ${Number(item.price).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ${Number(item.amount).toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-4"
          >
            <h3
              className="font-semibold text-gray-900 truncate"
              title={item.ebookTitle}
            >
              {item.ebookTitle}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {item.writer}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-semibold">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Paid</p>
                <p className="font-semibold text-green-600">
                  ${Number(item.amount).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Date</p>
                <p>
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>

                <span className="inline-flex mt-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Paid
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}