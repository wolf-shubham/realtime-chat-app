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
    try {
        const { name, username, email, password, displaypic } = req.body
        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(401).json({ message: 'user with that email already exists.' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
            displaypic
        }).save()
        const token = await newUser.generateToken()

        return res.status(200).json({ message: 'user registered successfully', newUser, token })
    } catch (error) {
        return res.status(400).json({ message: 'user register failed.' })
    }
}