import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const response = NextResponse.next();

    // 1. Security Headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com;"
    );

    // 2. Simple Bot Protection (Optional)
    const userAgent = request.headers.get("user-agent") || "";
    if (userAgent.includes("curl") || userAgent.includes("wget")) {
        return new NextResponse("Access Denied", { status: 403 });
    }

    return response;
}

export const config = {
    matcher: "/api/:path*",
};
