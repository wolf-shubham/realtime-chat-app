const Chat = require('../models/chat')
const User = require('../models/user')

exports.createChat = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) {
            return res.status(401).json({ message: 'userId is required' })
        }
        var chats = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: userId } } },
                { users: { $elemMatch: { $eq: req.user._id } } }
            ]
        }).populate('users', '_id name username')
            .populate('lastMessage', '_id message createdAt')
        chats = await User.populate(chats, {
            path: 'lastMessage.sender',
            select: '_id name username',
        })

        if (chats.length > 0) {
            return res.send(chats[0])
        } else {
            var chatData = {
                chatTitle: 'sender',
                isGroupChat: false,
                users: [req.user._id, userId],
            }
            try {
                const createdChat = await Chat.create(chatData)
                const fullChat = await Chat.findById(createdChat._id)
                    .populate('users', '_id name username')
                return res.status(200).json({ fullChat })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'network error in try block' })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'network error', error })
    }
}

