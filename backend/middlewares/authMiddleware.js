const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuthenticated = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'Plz Login first. Not Authorized' })
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            return res.status(404).json({ message: 'error in token' })
        }
    }
} 