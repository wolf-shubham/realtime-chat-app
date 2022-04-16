const { createChat } = require('../controllers/chatControllers')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const route = require('express').Router()

route.post('/', isAuthenticated, createChat)

module.exports = route