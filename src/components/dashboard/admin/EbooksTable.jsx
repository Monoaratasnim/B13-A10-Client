"use client";

import { useEffect, useState } from "react";

export default function EbooksTable() {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEbooks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/ebooks`
      );

      const data = await res.json();

      setEbooks(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEbooks();
  }, []);

  const handlePublish = async (
    id,
    currentStatus
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/ebooks/${id}/publish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            published: !currentStatus,
          }),
        }
      );

      if (!res.ok) {
        return alert("Update failed");
      }

      setEbooks((prev) =>
        prev.map((ebook) =>
          ebook._id === id
            ? {
                ...ebook,
                published: !currentStatus,
              }
            : ebook
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete ebook?"))
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/ebooks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        return alert("Delete failed");
      }

      setEbooks((prev) =>
        prev.filter((ebook) => ebook._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow">
        Loading ebooks...
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  Title
                </th>
                <th className="px-6 py-4 text-left">
                  Writer
                </th>
                <th className="px-6 py-4 text-left">
                  Price
                </th>
                <th className="px-6 py-4 text-left">
                  Status
                </th>
                <th className="px-6 py-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {ebooks.map((ebook) => (
                <tr
                  key={ebook._id}
                  className="border-t"
                >
                  <td className="px-6 py-4">
                    {ebook.title}
                  </td>

                  <td className="px-6 py-4">
                    {ebook.writerName}
                  </td>

                  <td className="px-6 py-4">
                    ${ebook.price}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        ebook.published
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {ebook.published
                        ? "Published"
                        : "Unpublished"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handlePublish(
                            ebook._id,
                            ebook.published
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        {ebook.published
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            ebook._id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:hidden">
        {ebooks.map((ebook) => (
          <div
            key={ebook._id}
            className="bg-white p-5 rounded-2xl shadow"
          >
            <h3 className="font-bold">
              {ebook.title}
            </h3>

            <p>{ebook.writerName}</p>

            <p>${ebook.price}</p>

            <p className="mt-2">
              {ebook.published
                ? "Published"
                : "Unpublished"}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() =>
                  handlePublish(
                    ebook._id,
                    ebook.published
                  )
                }
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
              >
                Toggle
              </button>

              <button
                onClick={() =>
                  handleDelete(ebook._id)
                }
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}