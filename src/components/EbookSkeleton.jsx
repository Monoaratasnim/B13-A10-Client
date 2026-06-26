export default function EbookSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border animate-pulse">

      <div className="h-52 sm:h-60 bg-gray-200" />

      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4" />

        <div className="h-3 bg-gray-200 rounded w-1/2 mt-3" />

        <div className="flex justify-between mt-6">
          <div className="h-5 bg-gray-200 rounded w-16" />

          <div className="h-8 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}