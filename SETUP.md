# 🚀 Envirocare Chatbot with Database Storage

## 📋 Overview
This chatbot now includes a complete backend API with MongoDB database storage for visitor details and chat messages.

## 🗄️ Database Schema

### Visitors Collection
- `visitorId` - Unique visitor identifier
- `name` - Visitor's name
- `email` - Visitor's email
- `phone` - Visitor's phone number
- `countryCode` - Country code (default: +91)
- `registrationDate` - When visitor registered
- `lastActive` - Last activity timestamp
- `totalMessages` - Total messages sent
- `conversationCount` - Number of conversations

### ChatMessages Collection
- `messageId` - Unique message identifier
- `visitorId` - Reference to visitor
- `message` - Message content
- `isVisitor` - Boolean (true for visitor, false for bot)
- `timestamp` - Message timestamp
- `conversationId` - Reference to conversation
- `messageType` - Type of message (text, quick_reply, form_submission)
- `metadata` - Additional message data

### Conversations Collection
- `conversationId` - Unique conversation identifier
- `visitorId` - Reference to visitor
- `startTime` - Conversation start time
- `endTime` - Conversation end time
- `status` - active, completed, abandoned
- `messageCount` - Number of messages in conversation
- `conversationStep` - Current conversation step
- `quickReplies` - Available quick replies
- `tags` - Conversation tags
- `summary` - Conversation summary
- `satisfaction` - User satisfaction rating (1-5)

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Update Database Password
Edit `config.js` and replace `<db_password>` with your actual MongoDB password:
```javascript
MONGODB_URI: 'mongodb+srv://himani:YOUR_ACTUAL_PASSWORD@ems.z3zxn2h.mongodb.net/?retryWrites=true&w=majority&appName=EMS'
```

### 3. Start the Backend Server
```bash
npm start
```
The API will run on `http://localhost:3001`

### 4. Test the API
Visit `http://localhost:3001/api/health` to check if the server is running.

## 📡 API Endpoints

### Visitors
- `POST /api/visitors/register` - Register new visitor
- `GET /api/visitors/:visitorId` - Get visitor by ID
- `PUT /api/visitors/:visitorId/activity` - Update visitor activity
- `GET /api/visitors/` - Get all visitors (admin)

### Messages
- `POST /api/messages` - Save new message
- `GET /api/messages/visitor/:visitorId` - Get messages for visitor
- `GET /api/messages/conversation/:conversationId` - Get messages for conversation
- `GET /api/messages/stats/:visitorId` - Get message statistics
- `DELETE /api/messages/visitor/:visitorId` - Delete messages for visitor

### Conversations
- `POST /api/conversations/start` - Start new conversation
- `PUT /api/conversations/:conversationId` - Update conversation
- `PUT /api/conversations/:conversationId/end` - End conversation
- `GET /api/conversations/:conversationId` - Get conversation details
- `GET /api/conversations/visitor/:visitorId` - Get conversations for visitor
- `GET /api/conversations/` - Get all conversations (admin)

## 🔄 How It Works

1. **Visitor Registration**: When a visitor fills out the form, their details are saved to the database
2. **Conversation Tracking**: Each chat session creates a new conversation record
3. **Message Storage**: Every message (visitor and bot) is saved to the database
4. **Real-time Updates**: Conversation steps and quick replies are updated in real-time

## 📊 Data Flow

```
Visitor Form → Database Registration → Conversation Start → Message Storage → Real-time Updates
```

## 🚀 Deployment

### Backend Deployment
1. Deploy the backend to a service like Heroku, Railway, or DigitalOcean
2. Update the `API_BASE_URL` in `chatbot.html` to point to your deployed backend
3. Ensure your MongoDB Atlas cluster allows connections from your deployment platform

### Frontend Deployment
1. Deploy the chatbot files to Netlify, Vercel, or any static hosting
2. Update the API URL in the chatbot code to point to your deployed backend

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)

### CORS Configuration
The server is configured to allow requests from:
- `http://localhost:3000` (local development)
- `https://envirocare-chatbot-standalone.netlify.app` (production)

## 📈 Analytics & Monitoring

The database now stores:
- **Visitor Analytics**: Registration dates, activity patterns
- **Message Analytics**: Message counts, conversation lengths
- **Engagement Metrics**: Quick reply usage, conversation completion rates
- **User Journey**: Complete conversation flows and decision points

## 🛡️ Security

- CORS protection for cross-origin requests
- Input validation and sanitization
- Error handling and logging
- MongoDB connection security

## 📝 Notes

- All visitor data is stored permanently in MongoDB
- Chat messages are preserved for analytics and support
- Conversations can be retrieved and analyzed
- The system supports multiple concurrent users
- Data is organized by visitor ID and conversation ID for easy querying
