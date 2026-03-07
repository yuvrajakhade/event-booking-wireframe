# Deployment Guide

## Event Management System - Node.js Backend

**Version:** 1.0  
**Last Updated:** March 7, 2026

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Production Deployment Options](#production-deployment-options)
4. [Environment Configuration](#environment-configuration)
5. [Database Setup](#database-setup)
6. [Deployment Steps](#deployment-steps)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Monitoring & Logging](#monitoring--logging)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

### Required Software

- Node.js v20+ (LTS recommended)
- npm v10+ or yarn v1.22+
- Git
- MongoDB v7+ or MongoDB Atlas account

### For Production

- Domain name
- SSL certificate (Let's Encrypt recommended)
- Server/hosting account (see options below)

---

## 💻 Local Development Setup

### 1. Clone and Install

```bash
# Clone repository
git clone <your-repo-url>
cd event-management-backend

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Variables

Create `.env` file in root:

```bash
# Server
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/event-management
# Or for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-management

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:19006,exp://localhost:8081

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1

# Cloudinary (Alternative to S3)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Event Management System

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
LOG_FILE=logs/app.log
```

### 3. Start MongoDB Locally

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7

# Or install MongoDB Community Edition
# https://www.mongodb.com/docs/manual/installation/
```

### 4. Run Development Server

```bash
# Development mode with hot reload
npm run dev
# or
yarn dev

# Production mode
npm start
# or
yarn start
```

### 5. Verify Installation

```bash
# Check server health
curl http://localhost:3000/api/v1/health

# Expected response:
# {"status":"ok","timestamp":"2026-03-07T10:00:00.000Z"}
```

---

## 🚀 Production Deployment Options

### Option 1: Heroku (Easiest - PaaS)

**Cost:** $7-25/month  
**Best for:** Small to medium apps

#### Steps:

1. **Install Heroku CLI**

```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**

```bash
heroku create your-app-name
```

3. **Add MongoDB Atlas**

```bash
# Sign up at https://www.mongodb.com/cloud/atlas
# Create free cluster
# Get connection string
heroku config:set MONGODB_URI="mongodb+srv://..."
```

4. **Set Environment Variables**

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET="your-secret"
heroku config:set PORT=3000
# ... set all other env vars
```

5. **Deploy**

```bash
git push heroku main
```

6. **Check Logs**

```bash
heroku logs --tail
```

---

### Option 2: DigitalOcean (VPS)

**Cost:** $6-12/month  
**Best for:** Full control, scalable

#### Steps:

1. **Create Droplet**
   - OS: Ubuntu 22.04 LTS
   - Plan: Basic ($6/month)
   - Region: Nearest to users

2. **SSH into Server**

```bash
ssh root@your-server-ip
```

3. **Install Dependencies**

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt update
apt install -y mongodb-org

# Start MongoDB
systemctl start mongod
systemctl enable mongod

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2
```

4. **Clone Repository**

```bash
cd /var/www
git clone <your-repo-url> event-management-backend
cd event-management-backend
npm install --production
```

5. **Setup Environment**

```bash
# Create .env file
nano .env
# Paste your production environment variables
```

6. **Start with PM2**

```bash
# Start app
pm2 start dist/server.js --name event-api

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup systemd
```

7. **Configure Nginx**

```bash
nano /etc/nginx/sites-available/event-api
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/event-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

8. **Setup SSL with Let's Encrypt**

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d api.yourdomain.com
```

---

### Option 3: AWS EC2 (Enterprise)

**Cost:** $10-100+/month  
**Best for:** Enterprise-grade, high scalability

#### Steps:

1. **Launch EC2 Instance**
   - AMI: Ubuntu Server 22.04 LTS
   - Instance Type: t3.small or higher
   - Security Group: Allow ports 22, 80, 443

2. **Follow DigitalOcean steps 2-8** above

3. **Configure AWS Services**

**S3 for File Storage:**

```bash
# Install AWS CLI
apt install -y awscli

# Configure
aws configure
# Enter your AWS credentials
```

**RDS for MongoDB (Optional):**

- Use Amazon DocumentDB for managed MongoDB
- Update MONGODB_URI in .env

---

### Option 4: Render.com (Modern PaaS)

**Cost:** $7-35/month  
**Best for:** Easy deployment, good developer experience

#### Steps:

1. **Sign up at render.com**

2. **Create New Web Service**
   - Connect GitHub repository
   - Name: event-management-api
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Add Environment Variables**
   - Go to Environment tab
   - Add all variables from .env

4. **Add MongoDB Atlas**
   - Use free MongoDB Atlas cluster
   - Add connection string to MONGODB_URI

5. **Deploy**
   - Click "Create Web Service"
   - Auto-deploys on git push

---

## ⚙️ Environment Configuration

### .env.production Template

```bash
# Server
NODE_ENV=production
PORT=3000
API_VERSION=v1
BASE_URL=https://api.yourdomain.com

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-management?retryWrites=true&w=majority

# JWT - Generate secure keys
JWT_SECRET=<generate-with-openssl-rand-base64-64>
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=<generate-with-openssl-rand-base64-64>
JWT_REFRESH_EXPIRES_IN=7d

# CORS - Your frontend URLs
CORS_ORIGIN=https://yourdomain.com,https://app.yourdomain.com

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Event Management

# SMS (Optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Monitoring
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Generate Secure Keys

```bash
# Generate JWT secrets
openssl rand -base64 64
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Sign up at** https://www.mongodb.com/cloud/atlas

2. **Create Cluster**
   - Choose FREE tier (M0)
   - Select region closest to your server
   - Cluster name: event-management

3. **Create Database User**
   - Database Access → Add New Database User
   - Username: admin
   - Password: (generate secure password)
   - Built-in Role: Read and write to any database

4. **Whitelist IP**
   - Network Access → Add IP Address
   - For development: Add Current IP
   - For production: Add server IP or 0.0.0.0/0 (all IPs)

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace <password> with actual password
   - Add to MONGODB_URI in .env

---

## 📦 Build and Deploy

### Build TypeScript

```bash
# Build production bundle
npm run build

# Output in dist/ folder
```

### Package.json Scripts

```json
{
  "scripts": {
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/event-management-backend
            git pull origin main
            npm install --production
            npm run build
            pm2 restart event-api
```

### Set GitHub Secrets

Repository → Settings → Secrets and variables → Actions

Add:

- `SERVER_HOST`: your-server-ip
- `SERVER_USER`: root
- `SSH_PRIVATE_KEY`: your-ssh-private-key

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# View logs
pm2 logs event-api

# Monitor resources
pm2 monit

# View dashboard
pm2 plus
```

### Setup Winston Logger

```javascript
// src/utils/logger.ts
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
```

### Error Tracking with Sentry

```bash
npm install @sentry/node
```

```javascript
// src/app.ts
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed

```bash
# Check MongoDB is running
systemctl status mongod

# Check connection string format
# Should be: mongodb+srv://username:password@host/database

# Check IP whitelist in MongoDB Atlas
```

#### 2. Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

#### 3. PM2 App Not Starting

```bash
# Check logs
pm2 logs event-api --lines 100

# Check error logs
pm2 logs event-api --err --lines 100

# Restart
pm2 restart event-api
```

#### 4. Nginx 502 Bad Gateway

```bash
# Check if Node app is running
pm2 status

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### 5. SSL Certificate Issues

```bash
# Renew Let's Encrypt certificate
certbot renew

# Test renewal
certbot renew --dry-run
```

---

## 📝 Post-Deployment Checklist

- [ ] Server is running and accessible
- [ ] MongoDB connection is working
- [ ] Environment variables are set correctly
- [ ] SSL certificate is installed
- [ ] Firewall allows ports 80 and 443
- [ ] PM2 is configured to restart on reboot
- [ ] Logs are being written
- [ ] Email/SMS services are working
- [ ] File uploads are working
- [ ] Rate limiting is active
- [ ] CORS is configured correctly
- [ ] Monitoring is setup
- [ ] Backups are scheduled
- [ ] API documentation is accessible
- [ ] Load testing completed
- [ ] Security audit passed

---

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit .env to git
2. **JWT Secrets**: Use cryptographically secure random strings
3. **HTTPS**: Always use SSL in production
4. **Rate Limiting**: Prevent brute force attacks
5. **Input Validation**: Validate all user inputs
6. **MongoDB**: Don't expose MongoDB port publicly
7. **Updates**: Keep dependencies updated
8. **Backups**: Schedule daily database backups
9. **Monitoring**: Set up alerts for errors
10. **Access Control**: Use proper user roles

---

## 📞 Support

For issues or questions:

- Check logs: `pm2 logs event-api`
- Review documentation
- Contact your development team

---

**Document Version:** 1.0  
**Last Updated:** March 7, 2026  
**Maintained by:** Your Team
