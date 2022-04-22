import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { CircularProgress } from '@mui/material'
import MessageBox from './MessageBox'


const Chat = ({ refetch, setRefetch }) => {
    const { user, createchat, setCreateChat, fetchChats, setFetchChats } = ChatState()
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
                <MessageBox refetch={refetch} setRefetch={setRefetch} />
            </div>
        </>
    )
}

export default Chat