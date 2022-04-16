const router = require('express').Router()
const { loginController, registerController, searchUsers } = require('../controllers/userControllers')

router.post('/login', loginController)

router.post('/register', registerController)

router.get('/', searchUsers)

module.exports = router