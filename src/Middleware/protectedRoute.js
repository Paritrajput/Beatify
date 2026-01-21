// middleware.js
import { verifyJWT } from "@/Utilities/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const protectedRoutes = ["/CreatePlaylist", "/AdminDashboard, Api/admin"]; // Add routes to protect

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    try {
      await verifyJWT(req);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if unauthorized
    }
  }

  return NextResponse.next();
}
