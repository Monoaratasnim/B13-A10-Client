"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const genres = [
  "Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Thriller",
  "Biography",
  "Self Development",
  "Poetry",
];

export default function AddEbookForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const form = e.target;

      const title = form.title.value;
      const genre = form.genre.value;
      const price = form.price.value;
      const description = form.description.value;

      const imageFile = form.cover.files[0];

      if (!imageFile) {
        alert("Please select a cover image");
        return;
      }

      // =====================
      // Upload to ImgBB
      // =====================

      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imageUpload = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_API}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imageResult = await imageUpload.json();

      if (!imageResult.success) {
        throw new Error("Image upload failed");
      }

      const coverImage = imageResult.data.url;

      // =====================
      // Save Ebook
      // =====================

      const ebookData = {
        title,
        genre,
        price: Number(price),
        description,
        coverImage,

        writerName: session?.user?.name,
        writerEmail: session?.user?.email,

        sold: false,
        published: true,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/ebooks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ebookData),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Ebook added successfully");

        form.reset();

        router.push("/dashboard/writer/manage-ebooks");
      } else {
        alert("Failed to add ebook");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Ebook
        </h1>

        <p className="text-gray-500 mt-2">
          Upload and publish your ebook for readers around the world.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-sm p-6 md:p-8 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Ebook Title
          </label>

          <input
            type="text"
            name="title"
            required
            placeholder="Atomic Habits"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Genre + Price */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Genre
            </label>

            <select
              name="genre"
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="">Select Genre</option>

              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Price ($)
            </label>

            <input
              type="number"
              name="price"
              required
              min="1"
              placeholder="10"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Cover */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Cover Image
          </label>

          <input
            type="file"
            name="cover"
            required
            accept="image/*"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Ebook Content / Full Description
          </label>

          <textarea
            name="description"
            required
            rows={12}
            placeholder="Write your ebook content here..."
            className="w-full border rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Writer Info */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-gray-50 border rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Writer Name
            </p>

            <p className="font-semibold">
              {session?.user?.name}
            </p>
          </div>

          <div className="bg-gray-50 border rounded-xl p-4">
            <p className="text-sm text-gray-500">
              Writer Email
            </p>

            <p className="font-semibold break-all">
              {session?.user?.email}
            </p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Publish Ebook"}
        </button>
      </form>
    </div>
  );
}