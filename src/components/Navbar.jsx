"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";

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
     <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
        {/* Mobile Menu Button */}
<button
  onClick={() => setMobileOpen(!mobileOpen)}
  className="md:hidden p-2 rounded-lg hover:bg-rose-50 transition"
  aria-label="Toggle Menu"
>
  {mobileOpen ? (
    <X className="w-7 h-7 text-rose-600" />
  ) : (
    <Menu className="w-7 h-7 text-rose-600" />
  )}
</button>
        </div>

     {/* MOBILE MENU */}
<div
  className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-rose-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
    mobileOpen
      ? "max-h-[500px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none"
  }`}
>
  <div className="px-6 py-5">

    {/* User Info */}
    {isLoggedIn && (
      <div className="flex items-center gap-3 pb-5 mb-5 border-b border-rose-100">

        {user?.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="h-12 w-12 rounded-full object-cover border"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0)}
          </div>
        )}

        <div>
          <p className="font-semibold text-stone-800">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

      </div>
    )}

    <div className="flex flex-col gap-2">

      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className={`rounded-xl px-4 py-3 transition ${
          isActive("/")
            ? "bg-rose-50 text-rose-600 font-semibold"
            : "hover:bg-rose-50"
        }`}
      >
        Home
      </Link>

      <Link
        href="/browse"
        onClick={() => setMobileOpen(false)}
        className={`rounded-xl px-4 py-3 transition ${
          isActive("/browse")
            ? "bg-rose-50 text-rose-600 font-semibold"
            : "hover:bg-rose-50"
        }`}
      >
        Browse Ebooks
      </Link>

      {isLoggedIn ? (
        <>
          <Link
            href={getDashboardLink()}
            onClick={() => setMobileOpen(false)}
            className={`rounded-xl px-4 py-3 transition ${
              isActive("/dashboard")
                ? "bg-rose-50 text-rose-600 font-semibold"
                : "hover:bg-rose-50"
            }`}
          >
            Dashboard
          </Link>

          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-left font-medium text-red-600 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl px-4 py-3 hover:bg-rose-50 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="mt-2 rounded-xl bg-rose-500 px-4 py-3 text-center font-semibold text-white hover:bg-rose-600 transition"
          >
            Sign Up
          </Link>
        </>
      )}

    </div>
  </div>
</div>

      </nav>
    </header>
  );
}