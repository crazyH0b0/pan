// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('user')?.value;

//   if (currentUser && !request.nextUrl.pathname.startsWith('/pan/list')) {
//     return Response.redirect(new URL('/pan/list', request.url));
//   }

//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('user')?.value;
  const path = request.nextUrl.pathname;

  // 如果用户已登录，并且路径不以 /pan/list 或 /share/ 开头，重定向到 /pan/list
  if (currentUser && !path.startsWith('/pan/list') && !path.startsWith('/share/')) {
    return Response.redirect(new URL('/pan/list', request.url));
  }

  // 如果用户未登录，并且路径不是以 /login 开头，重定向到 /login
  if (!currentUser && !path.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};