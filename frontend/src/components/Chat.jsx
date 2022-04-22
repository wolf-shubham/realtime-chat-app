import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import MessageBox from './MessageBox'


const Chat = ({ refetch, setRefetch }) => {
    const { user, createchat, setCreateChat, fetchChats, setFetchChats } = ChatState()
    const [loading, setLoading] = useState(false)

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