import { NextResponse } from "next/server";

export default function middleware(req) {
    const allowedMethods = ['POST', 'GET', 'DELETE'];
    if (allowedMethods.includes(req.method)) {
        return NextResponse.next();
    } else {
        return new NextResponse(
            JSON.stringify({ success: false, error: "Invalid request method: " + req.method }),
            { status: 400 }
        )
    }
}