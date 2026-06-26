import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    console.log("Middleware running");
  const isAdmin = request.cookies.get("isAdmin");

  const adminRoutes = [
    "/admin",
    "/admin/workers",
    "/admin/jobs",
  ];

  const pathname = request.nextUrl.pathname;
  
  if (
    adminRoutes.some((route) =>
      pathname.startsWith(route)
    ) &&
    !isAdmin
  ) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};