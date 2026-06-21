export default function EbookSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-white">
      <div className="h-56 bg-gray-200" />

      <div className="p-4">
        <div className="h-4 rounded bg-gray-200" />
        <div className="mt-3 h-3 w-2/3 rounded bg-gray-200" />

        <div className="mt-4 h-4 w-20 rounded bg-gray-200" />
      </div>
    </div>
  );
}