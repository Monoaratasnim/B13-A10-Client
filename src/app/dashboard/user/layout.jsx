"use client";

import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";

export default function DashboardRootLayout({ children }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}