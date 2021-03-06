import React, { useEffect, useState } from 'react'
import './Scrollbar.css'
import { Button, CircularProgress, Dialog } from '@mui/material'
import SearchUser from './SearchUser'
import SingleChat from './SingleChat'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import CreateGroupChat from './CreateGroupChat'

const UserChatsList = () => {

    const { createChat, token, setCreateChat, fetchChats, setFetchChats } = ChatState()


    const [searchUser, setSearchUser] = useState(false)
    const [createGroupChatUser, setCreateGroupChatUser] = useState(false)
    const [loading, setLoading] = useState(false)


    const fetchChatofUsers = async () => {
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get('/chat', config)
            setFetchChats(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchChatofUsers()
    }, [fetchChats])


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%'
                }}
            >
                <div
                    style={{
                        height: '15vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        onClick={() => setSearchUser(!searchUser)}
                        sx={{ width: '75%' }}
                        variant="contained"
                        color="primary">
                        Search user
                        <i className="fa-solid fa-magnifying-glass"
                            style={{
                                marginLeft: '1rem',
                                fontSize: '1.2rem'
                            }}></i>
                    </Button>
                    <Button
                        onClick={() => setCreateGroupChatUser(!createGroupChatUser)}
                        sx={{ width: '75%' }}
                        variant="contained"
                        color="primary">
                        Create group chat
                        <i className="fa-solid fa-plus"
                            style={{
                                marginLeft: '1rem',
                                fontSize: '1.2rem'
                            }}></i>
                    </Button>
                </div>
                <div className='scrollBar'>
                    {
                        fetchChats ?
                            <>
                                {fetchChats.map(chat => (
                                    <div
                                        key={chat._id}
                                        onClick={() => setCreateChat(chat)}
                                        style={{
                                            backgroundColor: `${createChat === chat ? '#F73859' : 'inherit'}`,
                                            borderRadius: '4px',
                                            marginBottom: '3px',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            opacity: '0.8',
                                            borderBottom: '2px solid #343A40',
                                        }}
                                    >
                                        <SingleChat
                                            key={chat._id}
                                            user={chat}
                                        />
                                    </div>
                                ))}
                            </>
                            :
                            <CircularProgress />
                    }
                </div>

            </div>

            <Dialog
                open={searchUser}
                onClose={() => setSearchUser(!searchUser)}
            >
                <SearchUser />
            </Dialog >
            <Dialog
                open={createGroupChatUser}
                onClose={() => setCreateGroupChatUser(!createGroupChatUser)}
            >
                <CreateGroupChat />
            </Dialog >
        </>
    )
}

export default UserChatsList