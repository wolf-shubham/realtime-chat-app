const { createChat, fetchChats, createGroupChat, addToGroupChat, removeFromGroupChat } = require('../controllers/chatControllers')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const route = require('express').Router()

route.post('/', isAuthenticated, createChat)

route.get('/', isAuthenticated, fetchChats)

route.post('/groupchat', isAuthenticated, createGroupChat)

route.put('/addtogroup', isAuthenticated, addToGroupChat)

route.put('/removefromgroup', isAuthenticated, removeFromGroupChat)


module.exports = route