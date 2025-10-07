const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Use environment variables with fallbacks
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://himani:<db_password>@ems.z3zxn2h.mongodb.net/?retryWrites=true&w=majority&appName=EMS';
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Import routes
const visitorRoutes = require('./routes/visitors');
const messageRoutes = require('./routes/messages');
const conversationRoutes = require('./routes/conversations');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://envirocare-chatbot-standalone.netlify.app'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
});

// Routes
app.use('/api/visitors', visitorRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Envirocare Chatbot API is running',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// API documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'Envirocare Chatbot API',
        version: '1.0.0',
        description: 'Backend API for Envirocare Chatbot with MongoDB storage',
        endpoints: {
            visitors: '/api/visitors',
            messages: '/api/messages',
            conversations: '/api/conversations',
            health: '/api/health'
        },
        documentation: {
            visitors: {
                'POST /register': 'Register new visitor',
                'GET /:visitorId': 'Get visitor by ID',
                'PUT /:visitorId/activity': 'Update visitor activity',
                'GET /': 'Get all visitors (admin)'
            },
            messages: {
                'POST /': 'Save new message',
                'GET /visitor/:visitorId': 'Get messages for visitor',
                'GET /conversation/:conversationId': 'Get messages for conversation',
                'GET /stats/:visitorId': 'Get message statistics',
                'DELETE /visitor/:visitorId': 'Delete messages for visitor'
            },
            conversations: {
                'POST /start': 'Start new conversation',
                'PUT /:conversationId': 'Update conversation',
                'PUT /:conversationId/end': 'End conversation',
                'GET /:conversationId': 'Get conversation details',
                'GET /visitor/:visitorId': 'Get conversations for visitor',
                'GET /': 'Get all conversations (admin)'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        availableEndpoints: [
            'GET /api/health',
            'GET /api',
            'POST /api/visitors/register',
            'GET /api/visitors/:visitorId',
            'POST /api/messages',
            'GET /api/messages/visitor/:visitorId',
            'POST /api/conversations/start',
            'GET /api/conversations/:conversationId'
        ]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Envirocare Chatbot API running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📚 API docs: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
});

module.exports = app;
