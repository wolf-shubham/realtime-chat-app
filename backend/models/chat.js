const mongoose = require('mongoose')

const chatModel = mongoose.Schema({
    chatTitle: { type: String, required: true },
    isGroupChat: { type: Boolean, required: true, default: false },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model('Chat', chatModel)

