const router = require('express').Router()
const { sendMessage, getMessagesFromChat } = require('../controllers/messageController')
const { isAuthenticated } = require('../middlewares/authMiddleware')


router.post('/', isAuthenticated, sendMessage)

router.get('/:chatId', isAuthenticated, getMessagesFromChat)

module.exports = router