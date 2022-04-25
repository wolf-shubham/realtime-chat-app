import React, { useState } from 'react'
// import { ChatState } from '../context/ChatProvider'
import { CircularProgress } from '@mui/material'
import MessageBox from './MessageBox'


const Chat = () => {
    // const { user, createchat, setCreateChat, fetchChats, setFetchChats } = ChatState()
    const [loading, setLoading] = useState(false)

    return (
        <>
            <div >

                {loading ? <CircularProgress /> : null}
                {/* <div>
                {fetchChats.map(chat => (
                    <SingleChat />
                ))}
            </div> */}
                <MessageBox />
            </div>
        </>
    )
}

export default Chat