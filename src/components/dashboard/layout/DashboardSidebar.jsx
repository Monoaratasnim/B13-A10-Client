"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function DashboardSidebar({ open, setOpen, role }) {
  const pathname = usePathname();

  const userLinks = [
    { name: "Dashboard", href: "/dashboard/user" },
    { name: "Bookmarks", href: "/dashboard/user/bookmarks" },
    { name: "Purchase History", href: "/dashboard/user/purchase-history" },
    { name: "Purchased Ebooks", href: "/dashboard/user/purchased-ebooks" },
    { name: "Profile", href: "/dashboard/user/profile" },
  ];

  const writerLinks = [
    { name: "Dashboard", href: "/dashboard/writer" },
    { name: "Add Ebook", href: "/dashboard/writer/add-ebook" },
    { name: "Manage Books", href: "/dashboard/writer/manage-ebooks" },
    { name: "Bookmarks", href: "/dashboard/writer/bookmarks" },
    { name: "Sales History", href: "/dashboard/writer/sales-history" },
  ];

  const adminLinks = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/manage-users" },
    { name: "Ebooks", href: "/dashboard/admin/manage-ebooks" },
    { name: "Transactions", href: "/dashboard/admin/transactions" },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "writer"
      ? writerLinks
      : userLinks;

  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-72 md:w-64
          bg-white border-r border-gray-200
          shadow-xl md:shadow-none
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="md:hidden flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* LOGO */}
        <div className="px-6 py-5 border-b">
          <h1 className="text-xl font-bold text-rose-500">
            Fable Dashboard
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Role: {role || "user"}
          </p>
        </div>

        {/* LINKS */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {links.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  block px-4 py-2 rounded-lg text-sm
                  transition
                  ${
                    active
                      ? "bg-rose-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t text-xs text-gray-400">
          © {new Date().getFullYear()} Fable
        </div>
      </aside>
    </>
  );
}