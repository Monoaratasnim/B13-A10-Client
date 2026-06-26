"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="w-16 h-16 border-[6px] border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>

        <h2 className="text-2xl font-bold text-gray-800">
          Fable
        </h2>

        <p className="text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
}