"use client";

import Link from "next/link";
import toast from "react-hot-toast";

export default function EbookManageTable({
  ebooks,
  refresh,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this ebook?"
    );

    if (!confirmDelete) return;

    const loadingToast = toast.loading(
      "Deleting ebook..."
    );

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/ebooks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.dismiss(loadingToast);

      toast.success(
        "Ebook deleted successfully"
      );

      refresh();
    } catch (error) {
      console.log(error);

      toast.dismiss(loadingToast);

      toast.error("Failed to delete ebook");
    }
  };

  const handlePublish = async (
    id,
    currentStatus
  ) => {
    const loadingToast = toast.loading(
      currentStatus
        ? "Unpublishing ebook..."
        : "Publishing ebook..."
    );

    try {
      const res = await fetch(
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

      if (!res.ok) {
        throw new Error();
      }

      toast.dismiss(loadingToast);

      toast.success(
        currentStatus
          ? "Ebook unpublished successfully"
          : "Ebook published successfully"
      );

      refresh();
    } catch (error) {
      console.log(error);

      toast.dismiss(loadingToast);

      toast.error(
        currentStatus
          ? "Failed to unpublish ebook"
          : "Failed to publish ebook"
      );
    }
  };

  return (
  <div className="bg-white rounded-2xl shadow overflow-hidden">
    {/* ---------------- Desktop Table ---------------- */}
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left">Cover</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Genre</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {ebooks.map((book) => (
            <tr
              key={book._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-24 rounded-lg object-cover shadow"
                />
              </td>

              <td className="p-4 font-semibold">
                {book.title}
              </td>

              <td className="p-4 font-medium text-green-600">
                ${book.price}
              </td>

              <td className="p-4">{book.genre}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/writer/edit/${book._id}`}
                    className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
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
                    className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm transition"
                  >
                    {book.published
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(book._id)
                    }
                    className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition"
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

    {/* ---------------- Mobile & Tablet Cards ---------------- */}

    <div className="lg:hidden p-4 space-y-5">
      {ebooks.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No ebooks found
        </div>
      ) : (
        ebooks.map((book) => (
          <div
            key={book._id}
            className="border rounded-2xl shadow-sm p-4 bg-white"
          >
            <div className="flex gap-4">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-24 h-32 rounded-xl object-cover shadow"
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Genre: {book.genre}
                </p>

                <p className="text-green-600 font-semibold mt-2">
                  ${book.price}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                    book.published
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.published
                    ? "Published"
                    : "Unpublished"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-5">
              <Link
                href={`/dashboard/writer/edit/${book._id}`}
                className="text-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
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
                className="px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm transition"
              >
                {book.published
                  ? "Unpublish"
                  : "Publish"}
              </button>

              <button
                onClick={() =>
                  handleDelete(book._id)
                }
                className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}