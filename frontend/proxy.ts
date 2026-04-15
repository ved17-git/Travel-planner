import { NextRequest, NextResponse } from "next/server"

const publicPaths=['/register', '/login', '/']

export function proxy(req:NextRequest) {
 
const token=req.cookies.get("token")?.value
const pathName=req.nextUrl.pathname

if(!token && !publicPaths.includes(pathName)){
        return NextResponse.redirect(new URL('/', req.url))
}
if(token && publicPaths.includes(pathName)){
    return NextResponse.redirect(new URL('/dashboard', req.url))
}

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}