import { Button, Dialog, CircularProgress } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import ChatBox from './ChatBox'
import ProfileModel from './ProfileModel'

const MessageBox = ({ refetch, setRefetch }) => {

    const { user, createChat, setCreateChat } = ChatState()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [openProfile, setOpenProfile] = useState(false)

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
                setMessages([...messages, data])

            } catch (error) {
                console.log(error)
            }
        }
    }


    useEffect(() => {
        fetchMessages()
    }, [createChat])
    return (
        <>
            {
                createChat ?
                    <>
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
                        >profile</Button>
                        <div>
                            {
                                loading ?
                                    <CircularProgress /> :
                                    (
                                        <div style={{
                                            height: '62vh',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                            <ChatBox messages={messages} />
                                        </div>
                                    )
                            }
                            <form onKeyDown={sendMessage}>
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