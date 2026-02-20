import { limiter } from "@/connection/rateLimit";
import { NextRequest, NextResponse } from "next/server";
import { RegistrationSchema } from "@/lib/validations";
import { logRegistrationAttempt } from "@/lib/s3";
import { saveUserToDynamoDB, checkUserExists } from "@/lib/dynamodb";


export async function POST(req: NextRequest) {
  const rateLimitHeaders = limiter.checkNext(req, 10);

  if (rateLimitHeaders.get("X-RateLimit-Remaining") === "0") {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Extract IP once for all logging
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(',')[0] : "unknown";

  try {
    const rawBody = await req.json();

    // 1. Zod Validation
    const result = RegistrationSchema.safeParse(rawBody);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const body = result.data;


    // 2. Duplicate Check using DynamoDB (Primary efficient check)
    const exists = await checkUserExists(body.email);
    if (exists) {
      await logRegistrationAttempt(body.email, "DUPLICATE_ATTEMPT", { ip });
      return NextResponse.json(

        { message: "This email is already registered." },
        { status: 409 }
      );
    }

    // 3. Save to DynamoDB
    await saveUserToDynamoDB(body);

    // 4. Archive Log to S3 (Audit Trail)
    await logRegistrationAttempt(body.email, "SUCCESS", {
      college: body.college,
      hasDocument: !!body.documentKey,
      ip
    });

    return NextResponse.json(
      { message: "Registration successful! Welcome to MythX Battleground." },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);

    // Capture the email if possible for the error log
    try {
      const email = (await req.clone().json())?.email || "unknown_error";
      await logRegistrationAttempt(email, "SERVER_ERROR", { ip, error: error.message });
    } catch { }

    if (error.name === "ConditionalCheckFailedException") {
      return NextResponse.json({ message: "Email already registered." }, { status: 409 });
    }

    return NextResponse.json(
      { message: "Registration failed. Please contact support @ MythX." },
      { status: 500 }
    );
  }
}


// Updated GET route to reflect S3 usage
export async function GET() {
  return NextResponse.json(
    {
      message: "Direct counting via S3 is disabled for performance. Use the admin dashboard to sync logs.",
      storageType: "AWS S3 (Cloud Native)"
    },
    { status: 200 }
  );
}

