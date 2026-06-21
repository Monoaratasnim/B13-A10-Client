"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isLoading } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;

  // ================= GOOGLE SIGNUP DETECTION =================
  // ONLY hide user when:
  // - user exists
  // - role missing
  // - AND user is on /register page (signup flow)
  const isGoogleSignupPending =
    !!user && !user?.role && pathname === "/register";

  // ================= AUTH STATE =================
  const isLoggedIn = !!user && !isGoogleSignupPending;

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const navLinkClass = (path) =>
    `transition-all duration-300 ${
      isActive(path)
        ? "text-rose-700 font-semibold"
        : "text-stone-600 hover:text-rose-600"
    }`;

  const getDashboardLink = () => {
    const role = user?.role;

    if (role === "admin") return "/dashboard/admin";
    if (role === "writer") return "/dashboard/writer";
    return "/dashboard/user";
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully 👋");

      setMobileOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rose-100 bg-[#FFF9F5]/90 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= DESKTOP ================= */}
        <div className="flex h-18 items-center justify-between">

{/* LOGO */}
<Link href="/" className="flex items-center gap-3 sm:gap-4">

 {/* Logo Image */}
<div className="h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 flex items-center justify-center">
  <img
    src="/images/logo.png"
    alt="Fable"
    className="h-full w-full object-contain scale-110 sm:scale-125"
  />
</div>

  {/* Brand Text */}
  <div className="flex flex-col justify-center leading-none">
    <h1 className="text-lg sm:text-xl font-semibold text-stone-800">
      Fable
    </h1>
    <p className="text-[10px] sm:text-xs text-stone-500">
      Discover Stories
    </p>
  </div>

</Link>

          {/* NAV */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/browse" className={navLinkClass("/browse")}>
              Browse Ebooks
            </Link>

            {/* show only real logged-in users */}
            {!isLoading && isLoggedIn && (
              <Link
                href={getDashboardLink()}
                className={navLinkClass("/dashboard")}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-4">

            {/* HIDE ONLY DURING GOOGLE SIGNUP ROLE SETUP */}
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="text-stone-700 hover:text-rose-600">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2.5 bg-rose-500 text-white rounded-xl"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                {/* USER INFO */}
                <div className="flex items-center gap-3">

                  {user?.image ? (
                    <img
                      src={user.image}
                      className="h-11 w-11 rounded-full border object-cover"
                      alt="user"
                    />
                  ) : (
                    <div className="h-11 w-11 flex items-center justify-center rounded-full bg-rose-500 text-white font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                  )}

                  <div className="hidden lg:block">
                    <p className="text-sm font-semibold text-stone-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role || ""}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border rounded-xl text-rose-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden border-t py-4">

            <Link href="/" className="block py-2">Home</Link>
            <Link href="/browse" className="block py-2">Browse</Link>

            {!isLoggedIn ? (
              <>
                <Link href="/login" className="block py-2">Login</Link>
                <Link href="/register" className="block py-2">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href={getDashboardLink()} className="block py-2">
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="block py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        )}

      </nav>
    </header>
  );
}