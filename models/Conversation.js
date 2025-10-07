const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
        unique: true
    },
    visitorId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active'
    },
    messageCount: {
        type: Number,
        default: 0
    },
    conversationStep: {
        type: String,
        default: 'ask_explore'
    },
    quickReplies: [String],
    tags: [String],
    summary: {
        type: String,
        default: ''
    },
    satisfaction: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    }
});

// Index for better query performance
conversationSchema.index({ visitorId: 1, startTime: -1 });
conversationSchema.index({ status: 1 });

module.exports = mongoose.model('Conversation', conversationSchema);
