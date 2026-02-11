import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Initialize Supabase client for middleware using SSR helpers
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/";
  const isProtectedRoute =
    pathname.startsWith("/informationinput") || pathname === "/overview";

  // Redirect unauthenticated users trying to access protected routes
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users trying to access login/signup pages
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/informationinput", req.url));
  }

  return res;
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/login", "/signup", "/informationinput/:path*", "/overview/:path*"],
};
