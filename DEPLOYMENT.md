# 🚀 Deployment Guide - Fly.io

This guide will help you deploy the MovieTracker backend to Fly.io.

## Prerequisites

1. **Fly CLI**: Install the Fly.io CLI
   ```bash
   # macOS
   brew install flyctl
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   
   # Windows
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Fly.io Account**: Sign up at [fly.io](https://fly.io) and get your account

3. **Database**: Set up a production MySQL database (PlanetScale, Railway, or similar)

## Step 1: Login to Fly.io

```bash
fly auth login
```

## Step 2: Prepare Your Environment

### 2.1 Set Environment Variables

Create a `.env.production` file in the backend directory:

```env
# Database (Use your production database URL)
DATABASE_URL="mysql://username:password@your-production-db-host:3306/movies_db"

# Authentication (Use a strong, unique secret)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=5000
NODE_ENV=production

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# CORS Configuration (Update with your frontend domain)
CORS_ORIGIN="https://your-frontend-domain.com"
```

### 2.2 Update fly.toml (Optional)

Edit `fly.toml` to customize your deployment:

```toml
app = "your-app-name"  # Change this to your preferred app name
primary_region = "iad"  # Change to your preferred region
```

## Step 3: Deploy

### Option 1: Using the Deployment Script

```bash
cd backend
./deploy.sh
```

### Option 2: Manual Deployment

```bash
cd backend

# Create the app (first time only)
fly apps create your-app-name

# Set secrets
fly secrets set DATABASE_URL="your-production-database-url"
fly secrets set JWT_SECRET="your-production-jwt-secret"
fly secrets set NODE_ENV="production"

# Deploy
fly deploy
```

## Step 4: Verify Deployment

1. **Check Health**: Visit `https://your-app-name.fly.dev/health`
2. **Test API**: Try the endpoints with your frontend or Postman
3. **Monitor Logs**: `fly logs`

## Step 5: Update Frontend

Update your frontend's environment variables to point to the new backend:

```env
VITE_API_URL=https://your-app-name.fly.dev/api
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify your `DATABASE_URL` is correct
   - Ensure your database allows external connections
   - Check if your database provider supports the connection

2. **Build Failed**
   - Check if all dependencies are in `package.json`
   - Verify TypeScript compilation works locally
   - Check the build logs: `fly logs`

3. **App Won't Start**
   - Check the logs: `fly logs`
   - Verify environment variables are set: `fly secrets list`
   - Ensure the port is correctly configured

### Useful Commands

```bash
# View logs
fly logs

# SSH into the app
fly ssh console

# Scale the app
fly scale count 1

# View app status
fly status

# Restart the app
fly apps restart your-app-name
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `NODE_ENV` | Environment (production) | Yes |
| `PORT` | Server port (5000) | No |
| `UPLOAD_DIR` | Upload directory (uploads) | No |
| `MAX_FILE_SIZE` | Max file size in bytes | No |
| `CORS_ORIGIN` | Allowed CORS origins | No |

## Security Considerations

1. **JWT Secret**: Use a strong, unique secret
2. **Database**: Use a production-grade database with SSL
3. **CORS**: Configure CORS to only allow your frontend domain
4. **File Uploads**: Consider using a CDN for production file storage

## Monitoring

1. **Fly.io Dashboard**: Monitor your app at [fly.io/apps](https://fly.io/apps)
2. **Logs**: Use `fly logs` to view application logs
3. **Metrics**: Monitor CPU, memory, and network usage

## Cost Optimization

1. **Auto-scaling**: The app is configured to scale to 0 when not in use
2. **Resource Limits**: Set appropriate CPU and memory limits
3. **Database**: Choose a cost-effective database provider

## Next Steps

1. **Domain**: Set up a custom domain in Fly.io dashboard
2. **SSL**: HTTPS is automatically configured
3. **CDN**: Consider using a CDN for static assets
4. **Monitoring**: Set up alerts for downtime and errors 