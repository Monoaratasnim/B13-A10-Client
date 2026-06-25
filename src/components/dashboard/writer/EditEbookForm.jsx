"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditEbookForm({ ebook }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(
    ebook?.title || ""
  );

  const [description, setDescription] = useState(
    ebook?.description || ""
  );

  const [price, setPrice] = useState(
    ebook?.price || ""
  );

  const [genre, setGenre] = useState(
    ebook?.genre || ""
  );

  const [coverImage, setCoverImage] = useState(
    ebook?.coverImage || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/writer/ebooks/${ebook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            price: Number(price),
            genre,
            coverImage,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        alert("Ebook Updated Successfully");

        router.push(
          "/dashboard/writer/manage-ebooks"
        );
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update ebook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border p-4 md:p-6 lg:p-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* TITLE */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Ebook Title
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                text-sm
                md:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-rose-500
              "
              placeholder="Atomic Habits"
            />
          </div>

          {/* COVER IMAGE */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Cover Image URL
            </label>

            <input
              type="text"
              required
              value={coverImage}
              onChange={(e) =>
                setCoverImage(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                text-sm
                md:text-base
                focus:outline-none
                focus:ring-2
                focus:ring-rose-500
              "
              placeholder="https://i.ibb.co/..."
            />
          </div>

          {/* PREVIEW */}
          {coverImage && (
            <div>
              <p className="font-medium text-gray-700 mb-3">
                Cover Preview
              </p>

              <img
                src={coverImage}
                alt="preview"
                className="
                  w-full
                  max-w-xs
                  rounded-xl
                  border
                  shadow-sm
                  object-cover
                "
              />
            </div>
          )}

          {/* GENRE + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) =>
                  setGenre(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  md:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-rose-500
                "
              >
                <option value="">
                  Select Genre
                </option>

                <option value="Fiction">
                  Fiction
                </option>

                <option value="Mystery">
                  Mystery
                </option>

                <option value="Romance">
                  Romance
                </option>

                <option value="Sci-Fi">
                  Sci-Fi
                </option>

                <option value="Fantasy">
                  Fantasy
                </option>

                <option value="Horror">
                  Horror
                </option>

                <option value="Biography">
                  Biography
                </option>
                 <option value="Self Development">
                  Self Development
                </option> <option value="Thriller">
                 Thriller
                </option> <option value="Poetry">
                  Poetry
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Price ($)
              </label>

              <input
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  md:text-base
                  focus:outline-none
                  focus:ring-2
                  focus:ring-rose-500
                "
                placeholder="9.99"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Description / Full Content
            </label>

            <textarea
              rows={10}
              required
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                text-sm
                md:text-base
                min-h-[250px]
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-rose-500
              "
              placeholder="Write your ebook description..."
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-xl
              font-medium
              transition
              hover:bg-gray-800
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Updating Ebook..."
              : "Update Ebook"}
          </button>
        </form>
      </div>
    </div>
  );
}