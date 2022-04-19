import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import CircularProgress from '@material-ui/core/CircularProgress'
import UserList from './UserList'

const SearchUser = () => {

    const { user, setCreateChat, fetchChats, setFetchchats } = ChatState()

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatLoading, setChatLoading] = useState(false)

    const handleSearch = async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            }
            const { data } = await axios.get(`/user?search=${search}`, config)
            console.log(data)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            console.log(error)
        }
    }

    const accessChat = (userId) => {
        console.log(userId)
        try {
            setChatLoading(true)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            }
            const { data } = axios.post(`/chat`, { userId }, config)

            if (!fetchChats.find(chat => chat.id === data.id)) {
                setFetchchats([...fetchChats, data])
            }

            setCreateChat(data)
            setChatLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{
            width: '25rem',
            height: '35rem',
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            flexDirection: 'column'
        }}>
            <h2 style={{
                marginBottom: '1rem'
            }}>SearchUser</h2>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <input
                    type="text"
                    placeholder="Search user"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        height: '2rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #ccc',
                        padding: '0.5rem'
                    }} />
                <button
                    onClick={handleSearch}
                    style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}>
                    <i class="fa-solid fa-search"
                        style={{
                            fontSize: '1.3rem',
                            marginLeft: '1.5rem'
                        }}></i>
                </button>
            </div>
            {
                loading ? <CircularProgress /> : (
                    searchResult?.map((user) => (
                        <UserList
                            key={user._id}
                            user={user}
                            handleFunction={() => accessChat(user._id)}
                        />
                    ))
                )
            }
            {
                chatLoading ? <CircularProgress /> : null
            }
        </div>
    )
}

export default SearchUser