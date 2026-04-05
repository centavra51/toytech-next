import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ru', 'ro', 'en'];
const defaultLocale = 'ro';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale; // Or detect from headers
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|admin|_next/static|_next/image|favicon.ico|images|logo_monolith.png).*)'],
};
