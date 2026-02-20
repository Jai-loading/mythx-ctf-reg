import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",
    // If credentials are not in .env, SDK will automatically use IAM Role (Instance Profile)
    credentials: process.env.AWS_ACCESS_KEY_ID ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    } : undefined
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "MythX_Users";

/**
 * Saves a user registration to DynamoDB.
 */
export async function saveUserToDynamoDB(userData: any) {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            pk: `USER#${userData.email}`, // Partition Key
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            college: userData.college,
            branch: userData.branch || "",
            rollno: userData.rollno || "",
            othercollege: userData.othercollege || "",
            documentKey: userData.documentKey || "",
            createdAt: new Date().toISOString(),
            status: "PENDING_VERIFICATION",
        },
        // Prevent overwrite if email already exists
        ConditionExpression: "attribute_not_exists(pk)",
    });

    return await docClient.send(command);
}

/**
 * Checks if a user already exists by email.
 */
export async function checkUserExists(email: string) {
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: {
            pk: `USER#${email}`,
        },
    });

    const response = await docClient.send(command);
    return !!response.Item;
}

/**
 * Advanced: Check if phone number exists across all users.
 * Requires a GSI on 'phone' for efficiency, but this is a scan-fallback for now
 * Note: In production, always use a GSI for this.
 */
export async function checkPhoneExists(phone: string) {
    const command = new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "PhoneIndex", // Assuming we create a GSI named PhoneIndex
        KeyConditionExpression: "phone = :phone",
        ExpressionAttributeValues: {
            ":phone": phone,
        },
    });

    try {
        const response = await docClient.send(command);
        return response.Items && response.Items.length > 0;
    } catch (err) {
        // If GSI doesn't exist, we fallback or ignore for simple MVP
        console.warn("Phone index check failed, make sure GSI 'PhoneIndex' exists on DynamoDB");
        return false;
    }
}
