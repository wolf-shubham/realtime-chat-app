const Chat = require('../models/chat')
const Message = require('../models/message')
const User = require('../models/user')

exports.sendMessage = async (req, res) => {
    try {
        const { message, chatId } = req.body
        if (!message || !chatId) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            })
        }
        const userId = req.user._id
        var newMessage = {
            message: message,
            sender: userId,
            chat: chatId
        }

        try {
            var messageAdd = await Message.create(newMessage);

            messageAdd = await messageAdd.populate("sender", "name profilePicture")
            messageAdd = await messageAdd.populate("chat")
            messageAdd = await User.populate(messageAdd, {
                path: "chat.users",
                select: "name profilePicture email",
            })

            await Chat.findByIdAndUpdate(req.body.chatId, { lastMessage: messageAdd });

            return res.status(200).json(messageAdd)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ messaged: error.message })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

exports.getAllMessagesFromChat = async (req, res) => {
    try {
        const { chatId } = req.params
        if (!chatId) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            })
        }
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name profilePicture email")
            .populate("chat")
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}