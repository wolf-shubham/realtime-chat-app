import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import UserList from './UserList'
import './Scrollbar.css'
import AddUser from './AddUser'

const CreateGroupChat = () => {
    const [groupName, setGroupName] = useState('')
    const [usersToBeAdded, setUsersToBeAdded] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)

    const { token, fetchChats, setFetchChats } = ChatState()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!usersToBeAdded || !groupName) {
            alert('Please fill all the fields')
            return
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`/chat/groupchat`, {
                groupTitle: groupName,
                usersList: JSON.stringify(usersToBeAdded.map(user => user._id)),
            }, config)
            console.log(data)
            setFetchChats([...fetchChats, data])
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
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
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`/user?search=${search}`, config)
            setSearchResult(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleGroup = async (userToAdd) => {
        if (usersToBeAdded.includes(userToAdd)) {
            alert('already added');
            return
        }
        setUsersToBeAdded([...usersToBeAdded, userToAdd])
    }

    const removeUser = (userToBeRemoved) => {
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
            <form style={{ width: '100%' }}>
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