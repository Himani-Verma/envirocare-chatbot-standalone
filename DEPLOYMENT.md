# 🚀 Deployment Guide for Envirocare Chatbot with Database

## 📋 Overview
This guide will help you deploy both the frontend (chatbot) and backend (API) to make the database storage work in production.

## 🎯 Deployment Strategy

### Frontend (Chatbot) → Netlify
- Static files (HTML, CSS, JS)
- Already deployed at: https://envirocare-chatbot-standalone.netlify.app/

### Backend (API) → Railway/Heroku
- Node.js server with MongoDB
- Handles database operations
- Provides API endpoints

## 🚀 Step 1: Deploy Backend to Railway (Recommended)

### Option A: Railway (Free Tier Available)

1. **Go to Railway**: https://railway.app/
2. **Sign up/Login** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository**: `Himani-Verma/envirocare-chatbot-standalone`
5. **Configure Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://himani:YOUR_PASSWORD@ems.z3zxn2h.mongodb.net/?retryWrites=true&w=majority&appName=EMS
   NODE_ENV=production
   PORT=3001
   ```
6. **Deploy** - Railway will automatically detect it's a Node.js app

### Option B: Heroku (Alternative)

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create app**: `heroku create envirocare-chatbot-api`
4. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://himani:YOUR_PASSWORD@ems.z3zxn2h.mongodb.net/?retryWrites=true&w=majority&appName=EMS"
   heroku config:set NODE_ENV="production"
   ```
5. **Deploy**: `git push heroku main`

## 🔧 Step 2: Update Frontend API URL

After deploying the backend, you'll get a URL like:
- Railway: `https://envirocare-chatbot-api-production.up.railway.app`
- Heroku: `https://envirocare-chatbot-api.herokuapp.com`

### Update chatbot.html:

1. **Open chatbot.html**
2. **Find this line** (around line 645):
   ```javascript
   const API_BASE_URL = 'http://localhost:3001/api';
   ```
3. **Replace with your deployed API URL**:
   ```javascript
   const API_BASE_URL = 'https://your-deployed-api-url.com/api';
   ```

## 🌐 Step 3: Update Netlify Deployment

### Method 1: Update via GitHub (Recommended)

1. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin main
   ```
2. **Netlify will auto-deploy** the updated files

### Method 2: Manual Update

1. **Go to Netlify Dashboard**
2. **Find your site**: envirocare-chatbot-standalone
3. **Go to Site Settings** → **Environment Variables**
4. **Add new variable**:
   - Key: `API_BASE_URL`
   - Value: `https://your-deployed-api-url.com/api`

## 🧪 Step 4: Test the Complete System

### Test Backend API:
```bash
# Test health endpoint
curl https://your-deployed-api-url.com/api/health

# Test API documentation
curl https://your-deployed-api-url.com/api
```

### Test Frontend:
1. **Open chatbot**: https://envirocare-chatbot-standalone.netlify.app/chatbot.html
2. **Fill out visitor form**
3. **Send messages**
4. **Check database** - data should be saved

## 📊 Step 5: Monitor Database

### MongoDB Atlas Dashboard:
1. **Login to MongoDB Atlas**
2. **Go to your cluster**
3. **Browse Collections**:
   - `visitors` - Visitor details
   - `chatmessages` - All chat messages
   - `conversations` - Conversation tracking

## 🔧 Environment Variables Summary

### Backend (Railway/Heroku):
```
MONGODB_URI=mongodb+srv://himani:YOUR_PASSWORD@ems.z3zxn2h.mongodb.net/?retryWrites=true&w=majority&appName=EMS
NODE_ENV=production
PORT=3001
```

### Frontend (Netlify):
```
API_BASE_URL=https://your-deployed-api-url.com/api
```

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Update CORS origins in server.js
   - Add your Netlify domain to allowed origins

2. **Database Connection**:
   - Check MongoDB Atlas IP whitelist
   - Verify password in MONGODB_URI

3. **API Not Found**:
   - Verify API_BASE_URL is correct
   - Check backend deployment logs

## 📈 Production Benefits

Once deployed, you'll have:
- ✅ **Persistent Data Storage** - All visitor details saved
- ✅ **Chat History** - Complete conversation records
- ✅ **Analytics Ready** - Track user engagement
- ✅ **Scalable** - Handles multiple users
- ✅ **Professional** - Production-ready system

## 🎉 Success Checklist

- [ ] Backend deployed to Railway/Heroku
- [ ] Environment variables set
- [ ] Frontend updated with API URL
- [ ] Netlify auto-deployed
- [ ] Database connection working
- [ ] Chatbot saving data to database
- [ ] All features working in production

Your chatbot will now have full database integration in production! 🚀📊
