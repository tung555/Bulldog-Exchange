import { NextRequest,NextResponse } from "next/server";
import {getToken} from "next-auth/jwt"

export async function middleware(request:NextRequest) {

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    
    if (!token) {
        return NextResponse.redirect(new URL("/login",request.url));    
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/my-items",
        "/item/:id*",
        "/profile",
        "/offer",
        "/offer/:id*",
        "/offer/user/:userId*"
    ]
}