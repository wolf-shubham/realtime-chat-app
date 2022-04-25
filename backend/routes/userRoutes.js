const router = require('express').Router()
const { loginController, registerController, searchUsers, updateProfilePicture } = require('../controllers/userControllers')
const { isAuthenticated } = require('../middlewares/authMiddleware')

router.post('/login', loginController)

router.post('/register', registerController)

router.get('/', isAuthenticated, searchUsers)

router.put('/updateProfilePic', isAuthenticated, updateProfilePicture)

module.exports = router