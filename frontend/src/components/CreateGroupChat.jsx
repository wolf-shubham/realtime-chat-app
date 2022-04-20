import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import UserList from './UserList'
import './Scrollbar.css'
import AddUser from './AddUser'

const CreateGroupChat = () => {
    // chats is fetchchats in ur project, createchat is
    const [groupName, setGroupName] = useState('')
    const [usersToBeAdded, setUsersToBeAdded] = useState([])
    const [groupChatName, setGroupChatName] = useState('')
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const { user, fetchChats, setFetchChats } = ChatState()

    const createGroupName = async () => {
        console.log('submit')
    }
    const handleSubmit = async () => {
        console.log('submit')
    }
    const searchUser = async (query) => {
        setSearch(query)
        if (!query) {
            return setSearchResult([])
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            }
            const { data } = await axios.get(`/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleGroup = async (userToAdd) => {
        console.log('submit')
        if (usersToBeAdded.includes(userToAdd)) {
            console.log('already added');
            return
        }
        setUsersToBeAdded([...usersToBeAdded, userToAdd])
    }

    const removeUser = (userToBeRemoved) => {
        console.log('remove')
        setUsersToBeAdded(usersToBeAdded.filter(user => user._id !== userToBeRemoved._id))
    }

    return (
        <div style={{
            width: '25rem',
            height: '30rem',
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            flexDirection: 'column'
        }}>
            <h2>create group chat</h2>
            <form onSubmit={createGroupName} style={{ width: '100%' }}>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    style={{
                        width: '100%',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #ccc',
                        padding: '0.5rem',
                        margin: '1.5rem 0'
                    }} />
            </form>
            <form style={{ width: '100%' }}>
                <input type="text"
                    placeholder="Search user"
                    value={search}
                    onChange={(e) => searchUser(e.target.value)}
                    style={{
                        width: '100%',
                        height: '2.5rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #ccc',
                        padding: '0.5rem',
                    }}
                />
            </form>
            <div style={{ display: 'flex', marginTop: '1rem' }}>
                {
                    usersToBeAdded.map(u => (
                        <AddUser
                            key={u._id}
                            user={u}
                            handleFunction={() => removeUser(u)}
                        />
                    ))
                }
            </div>

            <div className='scrollBar'
                style={{
                    width: '100%',
                }}>
                {
                    loading ? <div>Loading...</div> :
                        (
                            searchResult?.map(user => (
                                <UserList
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleGroup(user)}
                                />
                            )
                            ))
                }
            </div>

            <div style={{
                width: '100%',
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Create Chat
                </Button>
            </div>

        </div>
    )
}

export default CreateGroupChat