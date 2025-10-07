const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const ChatMessage = require('../models/ChatMessage');

// Start a new conversation
router.post('/start', async (req, res) => {
    try {
        const { visitorId, conversationStep = 'ask_explore', quickReplies = [] } = req.body;
        const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const conversation = new Conversation({
            conversationId,
            visitorId,
            conversationStep,
            quickReplies
        });
        
        await conversation.save();
        
        res.json({
            success: true,
            message: 'Conversation started',
            conversation: {
                conversationId: conversation.conversationId,
                visitorId: conversation.visitorId,
                startTime: conversation.startTime,
                status: conversation.status
            }
        });
    } catch (error) {
        console.error('Error starting conversation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start conversation',
            error: error.message
        });
    }
});

// Update conversation
router.put('/:conversationId', async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { conversationStep, quickReplies, tags, summary, satisfaction } = req.body;
        
        const updateData = {};
        if (conversationStep) updateData.conversationStep = conversationStep;
        if (quickReplies) updateData.quickReplies = quickReplies;
        if (tags) updateData.tags = tags;
        if (summary) updateData.summary = summary;
        if (satisfaction) updateData.satisfaction = satisfaction;
        
        const conversation = await Conversation.findOneAndUpdate(
            { conversationId },
            updateData,
            { new: true }
        );
        
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Conversation updated',
            conversation
        });
    } catch (error) {
        console.error('Error updating conversation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update conversation',
            error: error.message
        });
    }
});

// End conversation
router.put('/:conversationId/end', async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { summary, satisfaction } = req.body;
        
        const conversation = await Conversation.findOneAndUpdate(
            { conversationId },
            {
                status: 'completed',
                endTime: new Date(),
                summary: summary || '',
                satisfaction: satisfaction || null
            },
            { new: true }
        );
        
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Conversation ended',
            conversation
        });
    } catch (error) {
        console.error('Error ending conversation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to end conversation',
            error: error.message
        });
    }
});

// Get conversation details
router.get('/:conversationId', async (req, res) => {
    try {
        const { conversationId } = req.params;
        
        const conversation = await Conversation.findOne({ conversationId });
        
        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: 'Conversation not found'
            });
        }
        
        // Get messages for this conversation
        const messages = await ChatMessage.find({ conversationId })
            .sort({ timestamp: 1 });
        
        res.json({
            success: true,
            conversation: {
                ...conversation.toObject(),
                messages
            }
        });
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversation',
            error: error.message
        });
    }
});

// Get conversations for a visitor
router.get('/visitor/:visitorId', async (req, res) => {
    try {
        const { visitorId } = req.params;
        const { limit = 10, offset = 0 } = req.query;
        
        const conversations = await Conversation.find({ visitorId })
            .sort({ startTime: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(offset));
        
        res.json({
            success: true,
            conversations,
            count: conversations.length
        });
    } catch (error) {
        console.error('Error fetching visitor conversations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversations',
            error: error.message
        });
    }
});

// Get all conversations (admin)
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, status, visitorId } = req.query;
        const skip = (page - 1) * limit;
        
        let query = {};
        if (status) query.status = status;
        if (visitorId) query.visitorId = visitorId;
        
        const conversations = await Conversation.find(query)
            .sort({ startTime: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        const total = await Conversation.countDocuments(query);
        
        res.json({
            success: true,
            conversations,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch conversations',
            error: error.message
        });
    }
});

module.exports = router;
