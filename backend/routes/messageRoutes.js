const router = require('express').Router()
const { sendMessage, getAllMessagesFromChat } = require('../controllers/messageController')
const { isAuthenticated } = require('../middlewares/authMiddleware')


router.post('/', isAuthenticated, sendMessage)

router.get('/:chatId', isAuthenticated, getAllMessagesFromChat)

module.exports = router