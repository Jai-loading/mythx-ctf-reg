#!/bin/bash

# MythX EC2 Setup Script (Multi-Distro Support)
# Detects OS and installs dependencies for Ubuntu or Amazon Linux

echo "🛠️ Starting MythX EC2 Setup..."

# 1. Detect OS
if [ -f /etc/debian_version ]; then
    OS="debian"
    PKG_MANAGER="apt-get"
elif [ -f /etc/amazon-linux-release ] || [ -f /etc/redhat-release ]; then
    OS="rhel"
    PKG_MANAGER="dnf"
else
    echo "⚠️ Unsupported OS. Manual setup recommended."
    exit 1
fi

echo "📦 Detected $OS environment. Using $PKG_MANAGER..."

# 2. Update and Setup Swap (2GB)
sudo $PKG_MANAGER update -y
if [ ! -f /swapfile ]; then
    echo "💾 Adding 2GB Swap space..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

# 3. Install Node.js and Nginx
if [ "$OS" == "debian" ]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs nginx
else
    sudo dnf install -y nodejs nginx
fi

sudo npm install -g pm2

# 4. Configure Nginx
echo "⚙️ Configuring Nginx..."
NGINX_CONF=""
if [ "$OS" == "debian" ]; then
    NGINX_CONF="/etc/nginx/sites-available/mythx"
    sudo mkdir -p /etc/nginx/sites-available
else
    NGINX_CONF="/etc/nginx/conf.d/mythx.conf"
fi

sudo tee $NGINX_CONF <<EOF
server {
    listen 80;
    server_name _;

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

if [ "$OS" == "debian" ]; then
    sudo ln -sf /etc/nginx/sites-available/mythx /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
fi

sudo systemctl enable nginx
sudo systemctl restart nginx

echo "✅ Setup Complete! OS: $OS"

