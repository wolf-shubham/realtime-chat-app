const bcrypt = require('bcrypt')
const User = require('../models/user')
const generateToken = require('../config/generateToken')

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'user not found. try register first.' })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(404).json({ message: 'invalid email or password.' })
        }
        const token = generateToken(user._id)
        return res.status(200).json({ user, token, message: 'login successful.' })

    } catch (error) {
        return res.status(500).json({ message: 'network error' })
    }
}

exports.registerController = async (req, res) => {
    try {
        const { name, username, email, password } = req.body
        const checkEmail = await User.findOne({ email })
        const checkUsername = await User.findOne({ username })
        if (checkEmail) {
            return res.status(401).json({ message: 'user with that email already exists.' })
        }
        if (checkUsername) {
            return res.status(401).json({ message: 'UserName taken. Try another UserName.' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await new User({
            name,
            email,
            username,
            password: hashedPassword,
        }).save()
        const token = generateToken(newUser._id)

        return res.status(200).json({ message: 'user registered successfully', newUser, token })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'user register failed.' })
    }
}