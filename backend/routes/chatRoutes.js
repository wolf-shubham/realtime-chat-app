const { createChat, fetchChats, createGroupChat, addToGroupChat } = require('../controllers/chatControllers')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const route = require('express').Router()

route.post('/', isAuthenticated, createChat)

route.get('/', isAuthenticated, fetchChats)

route.post('/groupchat', isAuthenticated, createGroupChat)

route.put('/addtogroupchat', isAuthenticated, addToGroupChat)

module.exports = route