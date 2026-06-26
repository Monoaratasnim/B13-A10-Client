"use client";

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">

        <div className="text-6xl mb-5">
          ⚠️
        </div>

        <h1 className="text-3xl font-bold">
          Something went wrong
        </h1>

        <p className="text-gray-500 mt-3">
          An unexpected error occurred.
        </p>

        <button
          onClick={reset}
          className="mt-8 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl"
        >
          Reload
        </button>

      </div>
    </div>
  );
}