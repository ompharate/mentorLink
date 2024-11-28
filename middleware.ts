import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up"];

const secret = process.env.AUTH_SECRET;

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  if (token) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/auth/sign-in";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
