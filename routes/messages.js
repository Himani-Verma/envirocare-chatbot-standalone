const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const Conversation = require('../models/Conversation');

// Save a new message
router.post('/', async (req, res) => {
    try {
        const { messageId, visitorId, message, isVisitor, conversationId, messageType = 'text', metadata = {} } = req.body;
        
        // Create new message
        const chatMessage = new ChatMessage({
            messageId,
            visitorId,
            message,
            isVisitor,
            conversationId,
            messageType,
            metadata
        });
        
        await chatMessage.save();
        
        // Update conversation message count
        await Conversation.findOneAndUpdate(
            { conversationId },
            { $inc: { messageCount: 1 } }
        );
        
        res.json({
            success: true,
            message: 'Message saved successfully',
            data: {
                messageId: chatMessage.messageId,
                timestamp: chatMessage.timestamp
            }
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save message',
            error: error.message
        });
    }
});

// Get messages for a visitor
router.get('/visitor/:visitorId', async (req, res) => {
    try {
        const { visitorId } = req.params;
        const { conversationId, limit = 50, offset = 0 } = req.query;
        
        let query = { visitorId };
        if (conversationId) {
            query.conversationId = conversationId;
        }
        
        const messages = await ChatMessage.find(query)
            .sort({ timestamp: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset));
        
        res.json({
            success: true,
            messages: messages.reverse(), // Return in chronological order
            count: messages.length
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages',
            error: error.message
        });
    }
});

// Get messages for a conversation
router.get('/conversation/:conversationId', async (req, res) => {
    try {
        const { conversationId } = req.params;
        
        const messages = await ChatMessage.find({ conversationId })
            .sort({ timestamp: 1 }); // Chronological order
        
        res.json({
            success: true,
            messages,
            count: messages.length
        });
    } catch (error) {
        console.error('Error fetching conversation messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversation messages',
            error: error.message
        });
    }
});

// Get conversation statistics
router.get('/stats/:visitorId', async (req, res) => {
    try {
        const { visitorId } = req.params;
        
        const stats = await ChatMessage.aggregate([
            { $match: { visitorId } },
            {
                $group: {
                    _id: null,
                    totalMessages: { $sum: 1 },
                    visitorMessages: { $sum: { $cond: ['$isVisitor', 1, 0] } },
                    botMessages: { $sum: { $cond: ['$isVisitor', 0, 1] } },
                    conversations: { $addToSet: '$conversationId' }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalMessages: 1,
                    visitorMessages: 1,
                    botMessages: 1,
                    uniqueConversations: { $size: '$conversations' }
                }
            }
        ]);
        
        res.json({
            success: true,
            stats: stats[0] || {
                totalMessages: 0,
                visitorMessages: 0,
                botMessages: 0,
                uniqueConversations: 0
            }
        });
    } catch (error) {
        console.error('Error fetching message stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch message statistics',
            error: error.message
        });
    }
});

// Delete messages for a visitor (admin function)
router.delete('/visitor/:visitorId', async (req, res) => {
    try {
        const { visitorId } = req.params;
        
        const result = await ChatMessage.deleteMany({ visitorId });
        
        res.json({
            success: true,
            message: `Deleted ${result.deletedCount} messages for visitor ${visitorId}`
        });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete messages',
            error: error.message
        });
    }
});

module.exports = router;
