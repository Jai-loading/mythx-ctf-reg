
This document outlines the complete setup for AWS services and the deployment of the MythX CTF website.

## 1. AWS S3 Setup (Storage & Logs)
- **Bucket Name**: e.g., `mythx-assets-logs`
- **Region**: Same as your EC2 and DynamoDB (e.g., `us-east-1`).
- **CORS Configuration**: (Bucket Permissions > CORS)
  ```json
  [
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "POST", "GET"],
        "AllowedOrigins": ["https://yourdomain.com", "http://localhost:3000"],
        "ExposeHeaders": ["ETag"]
    }
  ]
  ```
- **Block Public Access**: Keep **ON**. Secure access is handled via IAM or Pre-signed URLs.

## 2. AWS DynamoDB Setup (Registrations)
- **Table Name**: `MythX_Users`
- **Partition Key**: `pk` (String)
- **Settings**: Use **On-Demand** capacity (most cost-effective for CTFs).
- **GSI (Optional)**: 
  - Index Name: `PhoneIndex`
  - Partition Key: `phone` (String)

## 3. IAM Policy (EC2 Access)
Create an IAM Role for your EC2 instance with the following policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::mythx-assets-logs/*",
                "arn:aws:s3:::mythx-assets-logs"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:Query",
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/MythX_Users"
        }
    ]
}
```

## 4. EC2 Instance Preparation
Connect to your EC2 (`t3.micro` recommended) and run:

```bash
# Update and Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# Install PM2
sudo npm install -g pm2

# Add Swap (Critical for build on 1GB RAM)
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile
sudo swapon /swapfile && echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 5. Deployment Commands
```bash
# Clone and Install
git clone <your-repo-url>
cd MythX
npm install

# Build (Will use swap if memory spikes)
npm run build

# Start with PM2
pm2 start npm --name "mythx" -- start
pm2 save
pm2 startup
```

## 6. Nginx Configuration (`/etc/nginx/sites-available/default`)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Apply with `sudo systemctl restart nginx`.
