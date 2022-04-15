const router = require('express').Router()
const { loginController, registerController } = require('../controllers/userControllers')

router.post('/login', loginController)

router.post('/register', registerController)



module.exports = router