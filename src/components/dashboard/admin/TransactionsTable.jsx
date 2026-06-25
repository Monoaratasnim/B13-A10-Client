"use client";

import { useEffect, useState } from "react";

export default function TransactionsTable() {
  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/admin/transactions`
        );

        const data = await res.json();

        setTransactions(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Transaction ID
              </th>

              <th className="px-6 py-4 text-left">
                Type
              </th>

              <th className="px-6 py-4 text-left">
                User Email
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="border-t"
              >
                <td className="px-6 py-4">
                  {tx._id}
                </td>

                <td className="px-6 py-4">
                  {tx.type}
                </td>

                <td className="px-6 py-4">
                  {tx.userEmail}
                </td>

                <td className="px-6 py-4">
                  $
                  {(
                    tx.amount / 100
                  ).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    tx.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}