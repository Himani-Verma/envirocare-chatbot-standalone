const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    visitorId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    countryCode: {
        type: String,
        default: '+91'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    totalMessages: {
        type: Number,
        default: 0
    },
    conversationCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);
