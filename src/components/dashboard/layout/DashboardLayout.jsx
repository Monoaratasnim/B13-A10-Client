"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({ children, role = "user" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <DashboardSidebar
        open={open}
        setOpen={setOpen}
        role={role}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader setOpen={setOpen} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}