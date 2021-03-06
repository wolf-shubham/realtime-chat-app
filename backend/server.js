const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./database/dbConnection')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require('path')


dotenv.config()
const app = express()
app.use(express.json())
connectDB()

const PORT = process.env.PORT || 5000

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/message', messageRoutes)


const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.sendFile('API is working')
    })
}



const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

const io = require('socket.io')(server, {
    pingTimeout: 50000,
    cors: {
        origin: 'http://localhost:3000'
    },
})

io.on("connection", (socket) => {
    console.log("New client connected to io")
    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
        console.log('joined user Id :', room)
    })

    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat
        // console.log('new message received :', newMessageReceived);
        if (!chat.users) {
            return console.log('no users')
        }
        chat.users.forEach(user => {
            // console.log(user._id);
            if (user._id === newMessageReceived.sender._id) return;
            socket.in(user._id).emit('message received', newMessageReceived)
        })
    })

    socket.off('setup', () => {
        console.log('user disconnected')
        socket.leave(userData._id)
    })
})