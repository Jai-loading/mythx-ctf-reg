import { NextRequest, NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/s3";
import { limiter } from "@/connection/rateLimit";

export async function POST(req: NextRequest) {
    // Rate limit upload URL requests to prevent abuse
    const rateLimitHeaders = limiter.checkNext(req, 5);
    if (rateLimitHeaders.get("X-RateLimit-Remaining") === "0") {
        return NextResponse.json({ message: "Too many upload requests" }, { status: 429 });
    }

    try {
        const { fileName, fileType } = await req.json();

        if (!fileName || !fileType) {
            return NextResponse.json({ message: "File name and type are required" }, { status: 400 });
        }

        // Basic file type validation (Security)
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowedTypes.includes(fileType)) {
            return NextResponse.json({ message: "Invalid file type. Only JPG, PNG, and PDF are allowed." }, { status: 400 });
        }

        const { uploadUrl, key } = await getPresignedUploadUrl(fileName, fileType);

        return NextResponse.json({ uploadUrl, key });
    } catch (error) {
        console.error("Presigned URL Error:", error);
        return NextResponse.json({ message: "Failed to generate upload URL" }, { status: 500 });
    }
}
