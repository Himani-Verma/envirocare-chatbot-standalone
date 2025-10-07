const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// Register new visitor
router.post('/register', async (req, res) => {
    try {
        const { visitorId, name, email, phone, countryCode } = req.body;
        
        // Check if visitor already exists
        let visitor = await Visitor.findOne({ visitorId });
        
        if (visitor) {
            // Update existing visitor
            visitor.name = name;
            visitor.email = email;
            visitor.phone = phone;
            visitor.countryCode = countryCode || '+91';
            visitor.lastActive = new Date();
            visitor.isActive = true;
        } else {
            // Create new visitor
            visitor = new Visitor({
                visitorId,
                name,
                email,
                phone,
                countryCode: countryCode || '+91'
            });
        }
        
        await visitor.save();
        
        res.json({
            success: true,
            message: 'Visitor registered successfully',
            visitor: {
                visitorId: visitor.visitorId,
                name: visitor.name,
                email: visitor.email,
                phone: visitor.phone,
                registrationDate: visitor.registrationDate
            }
        });
    } catch (error) {
        console.error('Error registering visitor:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register visitor',
            error: error.message
        });
    }
});

// Get visitor by ID
router.get('/:visitorId', async (req, res) => {
    try {
        const visitor = await Visitor.findOne({ visitorId: req.params.visitorId });
        
        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: 'Visitor not found'
            });
        }
        
        res.json({
            success: true,
            visitor: {
                visitorId: visitor.visitorId,
                name: visitor.name,
                email: visitor.email,
                phone: visitor.phone,
                registrationDate: visitor.registrationDate,
                lastActive: visitor.lastActive,
                totalMessages: visitor.totalMessages,
                conversationCount: visitor.conversationCount
            }
        });
    } catch (error) {
        console.error('Error fetching visitor:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch visitor',
            error: error.message
        });
    }
});

// Update visitor activity
router.put('/:visitorId/activity', async (req, res) => {
    try {
        const { visitorId } = req.params;
        const { totalMessages, conversationCount } = req.body;
        
        const visitor = await Visitor.findOneAndUpdate(
            { visitorId },
            {
                lastActive: new Date(),
                totalMessages: totalMessages || 0,
                conversationCount: conversationCount || 0
            },
            { new: true }
        );
        
        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: 'Visitor not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Visitor activity updated',
            visitor: {
                visitorId: visitor.visitorId,
                lastActive: visitor.lastActive,
                totalMessages: visitor.totalMessages,
                conversationCount: visitor.conversationCount
            }
        });
    } catch (error) {
        console.error('Error updating visitor activity:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update visitor activity',
            error: error.message
        });
    }
});

// Get all visitors (for admin)
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (page - 1) * limit;
        
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { visitorId: { $regex: search, $options: 'i' } }
                ]
            };
        }
        
        const visitors = await Visitor.find(query)
            .sort({ lastActive: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        
        const total = await Visitor.countDocuments(query);
        
        res.json({
            success: true,
            visitors,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch visitors',
            error: error.message
        });
    }
});

module.exports = router;
