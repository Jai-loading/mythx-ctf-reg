// ecosystem.config.js
require('dotenv').config()

module.exports = {
    apps: [
        {
            name: "mythx",
            script: "server.js",
            cwd: "/var/www/mythx/app", // important for EC2
            env: {
                NODE_ENV: "production",
                AWS_REGION: process.env.AWS_REGION,
                DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME,
                AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
                NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH
            }
        }
    ]
}