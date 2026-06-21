import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = ["/", "/login", "/register", "/ebooks"];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get session
  const session = await auth.api.getSession({
    headers: Object.fromEntries(req.headers),
  });

  // Not logged in → redirect login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = session.user.role;

  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ================= ROLE PROTECTION =================

  if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/writer")) {
    if (role !== "writer" && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// Routes protection
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/writer/:path*",
  ],
};