#!/bin/bash

# =============================================
# Deploy Script for frameyourself.cx
# =============================================

# Configuration
VPS_USER="root"
VPS_IP="82.221.139.21"
REMOTE_PATH="/var/www/art-gallery-shop"
LOCAL_PATH="/Users/pipegonzalez/Developer/art-gallery-shop"
PM2_APP_NAME="art-gallery"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deploying to frameyourself.cx${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Step 1: Upload files
echo -e "${YELLOW}[1/3] Uploading files to VPS...${NC}"
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '.env.local' \
    "$LOCAL_PATH/" "$VPS_USER@$VPS_IP:$REMOTE_PATH/"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to upload files${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Files uploaded successfully${NC}"
echo ""

# Step 2: Build on server
echo -e "${YELLOW}[2/3] Building app on server...${NC}"
ssh "$VPS_USER@$VPS_IP" "cd $REMOTE_PATH && npm install && npm run build"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to build app${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Step 3: Restart PM2
echo -e "${YELLOW}[3/3] Restarting app...${NC}"
ssh "$VPS_USER@$VPS_IP" "pm2 restart $PM2_APP_NAME"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to restart app${NC}"
    exit 1
fi
echo -e "${GREEN}✓ App restarted${NC}"
echo ""

# Done
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}  https://frameyourself.cx${NC}"
echo -e "${GREEN}========================================${NC}"
