"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setRole(session.user.role || "user");
      setLoading(false);
    }
  }, [session]);

  // prevent flicker
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        role={role}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        <DashboardHeader setOpen={setOpen} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}