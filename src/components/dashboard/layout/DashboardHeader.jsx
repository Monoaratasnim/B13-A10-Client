"use client";

import { Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function DashboardHeader({ setOpen }) {
  const { data: session } = authClient.useSession();

  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
        >
          <Menu />
        </button>

        <h1 className="font-semibold text-lg">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="text-sm text-gray-600 truncate max-w-[200px]">
        {session?.user?.email || "Guest"}
      </div>
    </header>
  );
}