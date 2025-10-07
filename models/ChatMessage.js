const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true
    },
    visitorId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isVisitor: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    conversationId: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'quick_reply', 'form_submission'],
        default: 'text'
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

// Index for better query performance
chatMessageSchema.index({ visitorId: 1, timestamp: -1 });
chatMessageSchema.index({ conversationId: 1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
