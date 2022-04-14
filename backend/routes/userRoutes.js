const router = require('express').Router()
const { loginController } = require('../controllers/userControllers')

// const userController = require('../controllers/userController')
// const authController = require('../controllers/authController')

router.get('/', loginController)

module.exports = router