const { createChat, fetchChats } = require('../controllers/chatControllers')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const route = require('express').Router()

route.post('/', isAuthenticated, createChat)

route.get('/', isAuthenticated, fetchChats)

module.exports = route