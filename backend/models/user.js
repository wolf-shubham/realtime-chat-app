const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePicture: {
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    },
    chats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model('User', userModel)