// ecosystem.config.js

module.exports = {
    apps: [
        {
            name: "mythx",
            script: "server.js",
            cwd: "/var/www/mythx/app",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
                AWS_REGION: "ap-south-1",
                DYNAMODB_TABLE_NAME: "MythX_CTF_Players",
                AWS_S3_BUCKET_NAME: "mythx-ctf-registrants",
                NEXT_PUBLIC_BASE_PATH: "/ctf2026"
            }
        }
    ]
}