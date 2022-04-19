import React, { useEffect, useState } from 'react'
import './Scrollbar.css'
import { Button, CircularProgress, Dialog } from '@mui/material'
import SearchUser from './SearchUser'
import SingleChat from './SingleChat'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import CreateGroupChat from './CreateGroupChat'

const UserChatsList = () => {
    // const { user } = ChatState()
    // console.log(user);

    const { user, createchat, setCreateChat, fetchChats, setFetchChats } = ChatState()


    const [searchUser, setSearchUser] = useState(false)
    const [createGroupChat, setCreateGroupChat] = useState(false)
    const [loading, setLoading] = useState(false)


    const loggedUser = JSON.parse(localStorage.getItem('userInfo'))

    const fetchChatofUsers = async () => {
        setLoading(true)
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${loggedUser.token}`
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
    }, [])

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div style={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <Button
                        onClick={() => setSearchUser(!searchUser)}
                        sx={{ width: '75%' }}
                        variant="contained"
                        color="primary">
                        Search user
                        <i class="fa-solid fa-magnifying-glass"
                            style={{
                                marginLeft: '1rem',
                                fontSize: '1.2rem'
                            }}></i>
                    </Button>
                    <Button
                        onClick={() => setCreateGroupChat(!createGroupChat)}
                        sx={{ width: '75%' }}
                        variant="contained"
                        color="primary">
                        Create group chat
                        <i class="fa-solid fa-plus"
                            style={{
                                marginLeft: '1rem',
                                fontSize: '1.2rem'
                            }}></i>
                    </Button>
                </div>
                <div className='scrollBar'>
                    {loading ? <CircularProgress /> : null}
                    <div>
                        {fetchChats.map(chat => (
                            <SingleChat
                                key={chat._id}
                                user={chat}
                            />
                        ))}
                    </div>
                </div>

            </div>

            <Dialog open={searchUser} onClose={() => setSearchUser(!searchUser)}>
                <SearchUser />
            </Dialog >
            <Dialog open={createGroupChat} onClose={() => setCreateGroupChat(!createGroupChat)}>
                <CreateGroupChat />
            </Dialog >
        </>
    )
}

export default UserChatsList