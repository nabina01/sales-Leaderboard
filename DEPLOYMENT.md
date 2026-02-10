# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Deploy to Railway (Recommended - Easiest)

Railway provides free PostgreSQL database and hosting.

1. **Create a Railway account**: Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Deploy from GitHub**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `SalesLeaderboard` repository
   - Railway will auto-detect your Node.js app

3. **Add PostgreSQL Database**:
   - In your project, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway will automatically create a `DATABASE_URL` environment variable

4. **Configure Environment Variables**:
   - The `DATABASE_URL` is automatically set
   - Add any other variables from `.env.example` if needed

5. **Deploy**:
   - Railway will automatically deploy your app
   - Get your deployment URL from the settings

### Option 2: Deploy to Render

Render provides free tier hosting.

1. **Create a Render account**: Go to [render.com](https://render.com) and sign up

2. **Create a PostgreSQL Database**:
   - Click "New +" → "PostgreSQL"
   - Choose free tier
   - Copy the "Internal Database URL"

3. **Create a Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Build Command: `npm install && npx prisma generate`
     - Start Command: `npm start`
   - Add environment variable:
     - Key: `DATABASE_URL`
     - Value: [paste the PostgreSQL URL from step 2]

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Get your URL: `https://your-app-name.onrender.com`

### Option 3: Deploy to Vercel + Neon Database

1. **Create a Neon Database**:
   - Go to [neon.tech](https://neon.tech) and create a free PostgreSQL database
   - Copy the connection string

2. **Deploy to Vercel**:
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Add Environment Variables**:
   ```bash
   vercel env add DATABASE_URL
   ```

4. **Redeploy**:
   ```bash
   vercel --prod
   ```

## After Deployment

1. **Run Migrations**:
   Most platforms run `npx prisma migrate deploy` automatically.
   If not, add it to your build command.

2. **Test Your API**:
   ```bash
   # Test the health endpoint
   curl https://your-app.com/

   # Add a test sale
   curl -X POST https://your-app.com/api/sales \
     -H "Content-Type: application/json" \
     -d '{"agentName": "Test Agent", "amount": 5000}'

   # Get leaderboard
   curl https://your-app.com/api/leaderboard
   ```

3. **Update your README** with the live URL

## Troubleshooting

- **Database connection failed**: Ensure `DATABASE_URL` environment variable is set correctly
- **Prisma errors**: Make sure `npx prisma generate` runs in your build command
- **Port issues**: Most platforms set the `PORT` environment variable automatically

## Need Help?

Check the platform-specific documentation:
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
