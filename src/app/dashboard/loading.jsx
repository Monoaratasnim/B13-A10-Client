"use client";

export default function DashboardLoading() {
  return (
    <div className="p-8">
      <div className="flex justify-center py-24">
        <div className="w-14 h-14 border-[5px] border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}