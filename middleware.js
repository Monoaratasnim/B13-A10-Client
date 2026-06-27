// 
import { NextResponse } from "next/server";

export function middleware() {
  console.log("middleware works");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};