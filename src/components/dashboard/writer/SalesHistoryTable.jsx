"use client";

export default function SalesHistoryTable({ sales }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">
          Sales Records
        </h2>
        <p className="text-sm text-gray-500">
          Track all ebook purchases and revenue
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">

            <tr className="border-b">
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Ebook Title
              </th>

              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Buyer
              </th>

              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Purchase Date
              </th>

              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Amount
              </th>
            </tr>

          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {sale.ebookTitle}
                </td>

                <td className="px-6 py-4">
                  {sale.userEmail}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(
                    sale.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span className="font-bold text-green-600">
                    ${sale.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sales.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No sales history found.
          </div>
        )}
      </div>

      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        {sales.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No sales history found.
          </div>
        ) : (
          <div className="divide-y">
            {sales.map((sale) => (
              <div
                key={sale._id}
                className="p-5 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-semibold">
                      {sale.ebookTitle}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {sale.userEmail}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="font-bold text-green-600">
                    ${sale.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {sales.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No sales history found.
          </div>
        ) : (
          <div className="p-4 space-y-4">

            {sales.map((sale) => (
              <div
                key={sale._id}
                className="border rounded-xl p-4 shadow-sm"
              >
                <div className="space-y-3">

                  <div>
                    <p className="text-xs text-gray-400">
                      Ebook
                    </p>

                    <h3 className="font-semibold">
                      {sale.ebookTitle}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Buyer
                    </p>

                    <p className="text-sm">
                      {sale.userEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Purchase Date
                    </p>

                    <p className="text-sm">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Amount
                    </p>

                    <p className="font-bold text-green-600 text-lg">
                      ${sale.amount}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}