const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { databaseConnection } = require('./database/dbConnection')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')


dotenv.config({ path: '../.env' })
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

databaseConnection()

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
