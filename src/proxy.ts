import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Safely retrieve the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/bangJanganEksploitDong");
  const isDashboardRoute = pathname.startsWith(
    "/bangJanganEksploitDong/dashboard",
  );

  if (isAdminRoute) {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmails.com";

    if (user) {
      // User is authenticated
      if (user.email !== adminEmail) {
        // Not the admin! Sign them out and redirect to home '/'
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL("/", request.url));
      }

      // If they are the verified admin and trying to access the login page,
      // redirect them straight to the dashboard.
      if (pathname === "/bangJanganEksploitDong") {
        return NextResponse.redirect(
          new URL("/bangJanganEksploitDong/dashboard", request.url),
        );
      }
    } else {
      // User is not authenticated
      if (isDashboardRoute) {
        // Trying to access the dashboard without logging in -> redirect to home '/'
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/bangJanganEksploitDong/:path*"],
};
