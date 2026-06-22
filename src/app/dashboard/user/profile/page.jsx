"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isLoading } = authClient.useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) setUser(session.user);
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500">User not found</p>
      </div>
    );
  }

  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b pb-3">
      <span className="text-gray-500 text-sm sm:text-base">{label}</span>
      <span className="font-medium text-sm sm:text-base break-all sm:text-right">
        {value}
      </span>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-5 sm:p-6 md:p-8 border">

        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl font-bold mb-6">
          My Profile
        </h1>

        {/* USER INFO */}
        <div className="space-y-4">

          <InfoRow label="Name" value={user.name || "N/A"} />
          <InfoRow label="Email" value={user.email} />

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 border-b pb-3">
            <span className="text-gray-500 text-sm sm:text-base">Role</span>
            <span
              className={`inline-block font-semibold px-3 py-1 rounded-full text-xs sm:text-sm w-fit ${
                user.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : user.role === "writer"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {user.role || "user"}
            </span>
          </div>

          <InfoRow label="User ID" value={user.id || "N/A"} />

        </div>

        {/* INFO BOX */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-600">
          Profile information is managed through authentication system.
          Role changes are controlled by admin only.
        </div>

      </div>
    </div>
  );
}