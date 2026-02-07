# Deployment Guide - frameyourself.cx

## Server Details

- **VPS IP:** 82.221.139.21
- **Domain:** frameyourself.cx
- **App Port:** 3001
- **PM2 Process:** art-gallery

---

## Quick Deploy (After Making Changes)

### 1. Upload Changes (from your Mac)

```bash
rsync -avz --exclude 'node_modules' --exclude '.next' /Users/pipegonzalez/Developer/art-gallery-shop root@82.221.139.21:/var/www/
```

### 2. SSH into VPS

```bash
ssh root@82.221.139.21
```

### 3. Rebuild & Restart

```bash
cd /var/www/art-gallery-shop
npm install      # Only if you added new dependencies
npm run build
pm2 restart art-gallery
```

---

## Useful Commands

### Check App Status
```bash
pm2 list
```

### View Logs
```bash
pm2 logs art-gallery
pm2 logs art-gallery --lines 50  # Last 50 lines
```

### Restart App
```bash
pm2 restart art-gallery
```

### Stop App
```bash
pm2 stop art-gallery
```

### Reload Nginx
```bash
sudo nginx -t                    # Test config
sudo systemctl reload nginx      # Reload
sudo systemctl restart nginx     # Full restart
```

---

## Configuration Files

### Nginx Config
```
/etc/nginx/conf.d/art-gallery.conf
```

### PM2 Process
```bash
pm2 list                         # View processes
pm2 save                         # Save process list
pm2 startup                      # Enable startup on boot
```

### SSL Certificates
```
/etc/letsencrypt/live/frameyourself.cx/
```

---

## Troubleshooting

### App Shows "errored" in PM2
```bash
pm2 logs art-gallery             # Check error
cd /var/www/art-gallery-shop
npm run build                    # Rebuild
pm2 restart art-gallery
```

### Site Not Loading
```bash
# Check if app is running
pm2 list

# Check if port is listening
ss -tlnp | grep 3001

# Test app directly
curl http://localhost:3001

# Check nginx
sudo nginx -t
sudo systemctl status nginx
```

### SSL Certificate Renewal
```bash
sudo certbot renew               # Renew all certs
sudo certbot renew --dry-run     # Test renewal
```

---

## Full Fresh Deployment

If you need to deploy from scratch:

```bash
# 1. Upload files (from Mac)
rsync -avz --exclude 'node_modules' --exclude '.next' /Users/pipegonzalez/Developer/art-gallery-shop root@82.221.139.21:/var/www/

# 2. SSH into server
ssh root@82.221.139.21

# 3. Install & Build
cd /var/www/art-gallery-shop
npm install
npm run build

# 4. Start with PM2
pm2 delete art-gallery           # Remove old process if exists
PORT=3001 pm2 start npm --name "art-gallery" -- start
pm2 save

# 5. Verify
pm2 list
curl http://localhost:3001
```

---

## Other Sites on This VPS

- **puretide.ca** - Port 3000, PM2 process: puretide

Keep ports separate to avoid conflicts.
