import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
// @ts-ignore - AWS SDK module resolution issues in some environments
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "";

/**
 * Generates a pre-signed URL for client-side upload.
 * This keeps AWS credentials off the client and bypasses Next.js body limits.
 */
export async function getPresignedUploadUrl(fileName: string, fileType: string) {
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.]/g, "_");
    const key = `uploads/${Date.now()}-${sanitizedName}`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return { uploadUrl, key };
}

/**
 * Log registration attempts to S3 (Security Audit Trail)
 */
export async function logRegistrationAttempt(email: string, status: string, details: any) {
    const timestamp = Date.now();
    const dateStr = new Date().toISOString().split('T')[0];
    const key = `logs/${dateStr}/${email.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}_${status}.json`;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: JSON.stringify({
            email,
            status,
            timestamp: new Date().toISOString(),
            ...details,
        }),
        ContentType: "application/json",
    });

    try {
        await s3Client.send(command).catch(() => { });
    } catch (e) {
        console.error("Failed to log to S3", e);
    }
}
