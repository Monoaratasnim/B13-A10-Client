import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-white px-6">
      <div className="text-center max-w-lg">

      

        <h1 className="text-5xl font-bold text-gray-900">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-500">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
        >
          Go Home
        </Link>

      </div>
    </div>
  );
}