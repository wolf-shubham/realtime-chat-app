import { Button, Dialog, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import ChatBox from './ChatBox'
import ProfileModel from './ProfileModel'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000/'
var socket, selectedChatMatch

const MessageBox = ({ refetch, setRefetch }) => {

    const { user, createChat, setCreateChat } = ChatState()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [openProfile, setOpenProfile] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)

    const userName = createChat?.users[0]._id === user?.user._id ? createChat?.users[1].name : createChat?.users[0].name

    const selectedUser = createChat?.users[0]._id === user?.user._id ? createChat?.users[1] : createChat?.users[0]

    const fetchMessages = async () => {
        if (!createChat) return;
        try {
            setLoading(true)
            const config = { headers: { Authorization: `Bearer ${user?.token}` } }

            const { data } = await axios.get(`/message/${createChat?._id}`, config)
            // console.log(messages)
            setMessages(data)
            setLoading(false)

            socket.emit('join chat', createChat?._id)
        } catch (error) {
            console.log(error)
        }

    }

    const sendMessage = async (e) => {
        if (e.key === 'Enter' && newMessage) {
            try {
                e.preventDefault()
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${user?.token}`
                    }
                }

                const { data } = await axios.post('/message', {
                    chatId: createChat?._id,
                    message: newMessage
                }, config)
                console.log(data)
                setNewMessage('')
                socket.emit('new message', data)
                setMessages([...messages, data])

            } catch (error) {
                console.log(error)
            }
        }
    }

    const userData = user?.user

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", userData)
        socket.on('connection', () => setSocketConnected(true))
    }, [])

    useEffect(() => {
        fetchMessages()
        selectedChatMatch = createChat
    }, [createChat])

    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            if (!selectedChatMatch || selectedChatMatch._id !== newMessageReceived.chat._id) {
                console.log('new message received')
            } else {
                setMessages([...messages, newMessageReceived])
            }
        })
    })


    return (
        <>
            {
                createChat ?
                    <>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0 0.5rem',
                        }}>
                            {!createChat.isGroupChat ?
                                (
                                    <>
                                        <h2>{!user.isGroupChat ? userName : user.chatTitle}</h2>
                                    </>
                                ) :
                                (
                                    <>
                                        <h2>{createChat.chatTitle.toUpperCase()}</h2>
                                    </>
                                )
                            }
                            <Button
                                onClick={() => setOpenProfile(true)}
                            ><i class="fa-solid fa-id-badge" style={{ fontSize: '2rem', color: '#FD5D5D' }}></i></Button>
                        </div>
                        <div >
                            {
                                loading ?
                                    <CircularProgress /> :
                                    (
                                        <div style={{
                                            height: '64vh',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }} >
                                            <ChatBox messages={messages} />
                                        </div>
                                    )
                            }
                            <form onKeyDown={sendMessage} style={{ marginTop: '5px' }}>
                                <input
                                    type="text"
                                    placeholder="Type your message"
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                    style={{
                                        width: '100%',
                                        height: '2.5rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #ccc',
                                        padding: '0.5rem',
                                    }}
                                />
                            </form>
                        </div>
                    </> :
                    (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <h2>Select Chat To Start...</h2>
                        </div>
                    )
            }

            <Dialog open={openProfile} onClose={() => setOpenProfile(!openProfile)}>

                <ProfileModel user={selectedUser} chatDetails={createChat} groupChat={createChat?.isGroupChat} />
            </Dialog >
        </>
    )
}

export default MessageBox