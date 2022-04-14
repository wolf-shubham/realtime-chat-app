const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
}, { timestamps: true })

module.exports = mongoose.model('Message', messageModel)
