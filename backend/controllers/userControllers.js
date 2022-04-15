exports.loginController = function (req, res) {
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
        const token = await user.generateToken()
        return res.status(200).json({ user, token, message: 'login successful.' })

    } catch (error) {
        return res.status(500).json({ message: 'network error' })
    }
}

exports.registerController = function (req, res) {
    res.send('Hello World from user !!')
}