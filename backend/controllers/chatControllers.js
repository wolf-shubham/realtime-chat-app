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
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate('users', '_id name username')
            .populate('lastMessage', '_id message createdAt')
        chats = await User.populate(chats, {
            path: 'lastMessage.sender',
            select: '_id name username',
        })

        if (chats.length > 0) {
            return res.json(chats[0])
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
                return res.status(200).json(fullChat)
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

exports.fetchChats = async (req, res) => {
    try {
        var chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).populate('users', '_id name username')
            .populate('groupAdmin', '_id name username')
            .populate('lastMessage', '_id message createdAt')
            .sort({ updatedAt: -1 })
            .then(async (chatData) => {
                chatData = await User.populate(chatData, {
                    path: 'lastMessage.sender',
                    select: '_id name username',
                })
                return res.status(200).json(chatData)
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'network error', error })
    }
}


exports.createGroupChat = async (req, res) => {
    try {
        const { groupTitle, usersList } = req.body
        if (!groupTitle || !usersList) {
            return res.status(401).json({ message: 'groupTitle and users are required' })
        }

        var users = JSON.parse(usersList)

        users.push(req.user)

        var chatData = {
            chatTitle: groupTitle,
            isGroupChat: true,
            groupAdmin: req.user,
            users: users,
        }
        try {
            const createdGroupChat = await Chat.create(chatData)
            const fullGroupChat = await Chat.findById(createdGroupChat._id)
                .populate('users', '_id name username')
                .populate('groupAdmin', '_id name username')
                .populate('lastMessage', '_id message createdAt')
            return res.status(200).json({ fullGroupChat })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'network error in try block' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'network error', error })
    }
}

exports.addToGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body
        if (!chatId || !userId) {
            return res.status(401).json({ message: 'chatId and userId are required' })
        }
        var chat = await Chat.findById(chatId)
        if (!chat) {
            return res.status(401).json({ message: 'chat not found' })
        }
        if (chat.isGroupChat) {
            chat.users.push(userId)
            chat.save()
            return res.status(200).json({ message: 'user added to group' })
        } else {
            return res.status(401).json({ message: 'chat is not a group chat' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'network error', error })
    }
}

exports.removeFromGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body
        if (!chatId || !userId) {
            return res.status(401).json({ message: 'chatId and userId are required' })
        }
        var chat = await Chat.findById(chatId)
        if (!chat) {
            return res.status(401).json({ message: 'chat not found' })
        }
        if (chat.isGroupChat) {
            chat.users.pull(userId)
            chat.save()
            return res.status(200).json({ message: 'user removed from group' })
        } else {
            return res.status(401).json({ message: 'chat is not a group chat' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'network error', error })
    }
}