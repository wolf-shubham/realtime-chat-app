const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
dotenv.config()
const userRoutes = require('./routes/userRoutes')

app.use('/user', userRoutes)

//routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
