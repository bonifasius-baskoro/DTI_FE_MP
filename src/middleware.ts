// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
 function middleware(req) {
   const token = req.nextauth.token;
   const path = req.nextUrl.pathname;
   
   if (path.startsWith("/organizer") && token?.roles !== "ORGANIZER") {
     return NextResponse.redirect(new URL("/login", req.url));
   }
   
   if (path.startsWith("/user") && token?.roles !== "USER") {
     return NextResponse.redirect(new URL("/login", req.url));
   }
 },
 {
   callbacks: {
     authorized: ({ token }) => !!token
   }
 }
);

export const config = {
 matcher: ["/organizer/:path*", "/user/:path*", "/events/:path*"]
};