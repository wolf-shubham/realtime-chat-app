import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import MessageBox from './MessageBox'


const Chat = ({ refetch, setRefetch }) => {
    const { user, createchat, setCreateChat, fetchChats, setFetchChats } = ChatState()
    const [loading, setLoading] = useState(false)

    // const testData = JSON.parse(localStorage.getItem('userInfo'))

    // const fetchChatofUsers = async () => {
    //     setLoading(true)
    //     try {
    //         const config = {
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'Authorization': `Bearer ${testData.token}`
    //             }
    //         }
    //         const { data } = await axios.get('/chat', config)
    //         console.log(data)
    //         setFetchChats(data)
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchChatofUsers()
    // }, [])
    return (
        <>
            {loading ? <CircularProgress /> : null}
            {/* <div>
                {fetchChats.map(chat => (
                    <SingleChat />
                ))}
            </div> */}
            <MessageBox refetch={refetch} setRefetch={setRefetch} />
        </>
    )
}

export default Chat