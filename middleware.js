import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = ["/", "/login", "/register", "/ebooks"];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get session safely
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  // ❌ Not logged in → login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = session.user.role || "user";

  // ================= ROLE PROTECTION =================

  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/writer")) {
    if (role !== "writer" && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/dashboard/user")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// IMPORTANT: matcher fix
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/writer/:path*",
  ],
};