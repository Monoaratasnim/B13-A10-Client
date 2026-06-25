"use client";

import Link from "next/link";

export default function EbookManageTable({
  ebooks,
  refresh,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Delete this ebook?"
    );

    if (!confirmDelete) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/ebooks/${id}`,
      {
        method: "DELETE",
      }
    );

    refresh();
  };

  const handlePublish = async (
    id,
    currentStatus
  ) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/ebooks/${id}/publish`,
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

    refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">
                Cover
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Genre
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {ebooks.map((book) => (
              <tr
                key={book._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={book.coverImage}
                    alt=""
                    className="w-14 h-20 rounded object-cover"
                  />
                </td>

                <td className="p-4 font-medium">
                  {book.title}
                </td>

                <td className="p-4">
                  ${book.price}
                </td>

                <td className="p-4">
                  {book.genre}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      book.published
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.published
                      ? "Published"
                      : "Unpublished"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2 flex-wrap">

                    <Link
                      href={`/dashboard/writer/edit/${book._id}`}
                      className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handlePublish(
                          book._id,
                          book.published
                        )
                      }
                      className="px-3 py-2 rounded-lg bg-yellow-500 text-white text-sm"
                    >
                      {book.published
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(book._id)
                      }
                      className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {ebooks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No ebooks found
          </div>
        )}
      </div>
    </div>
  );
}