#!/bin/bash

# MythX EC2 Setup Script
# Run as: curl -s https://.../setup-ec2.sh | bash

echo "🛠️ Starting MythX EC2 Setup..."

# 1. Update system
sudo apt-get update && sudo apt-get upgrade -y

# 2. Add Swap (2GB) - Critical for t3.micro
if [ ! -f /swapfile ]; then
    echo "💾 Adding 2GB Swap space..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# 3. Install Node.js 20
echo "🟢 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install Nginx and PM2
echo "🌐 Installing Nginx and PM2..."
sudo apt-get install -y nginx
sudo npm install -g pm2

# 5. Configure Nginx
echo "⚙️ Configuring Nginx..."
sudo tee /etc/nginx/sites-available/mythx <<EOF
server {
    listen 80;
    server_name _; # Change to your domain later

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/mythx /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

echo "✅ Setup Complete! Now clone your repo, npm install, npm build, and start with pm2."
