import React from 'react'
import { ChatState } from '../context/ChatProvider'
import ScrollableFeed from "react-scrollable-feed"
import { Tooltip } from '@mui/material'

const ChatBox = ({ messages }) => {
    const { user } = ChatState()
    const userId = user?._id

    const isSameAuthor = (messages, message, index, userId) => {
        return (
            index < messages.length - 1 &&
            (messages[index + 1].sender._id !== message.sender._id || messages[index + 1].sender._id === undefined) && messages[index].sender._id !== userId
        )
    }

    const isLastMessage = (messages, index, userId) => {
        return (
            index === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        )
    }

    return (
        <ScrollableFeed className='scrollBar'>
            {messages && messages?.map((message, index) =>
                <div key={message?._id} style={{ display: 'flex' }} >

                    {userId === message.sender._id ?

                        <div style={{ marginLeft: 'auto', backgroundColor: '#3282B8', marginBottom: '3px', marginRight: '0.5rem', borderRadius: '5px', maxWidth: '80%' }}>
                            <h3
                                style={{
                                    width: 'fit-content',
                                    padding: '5px 10px',
                                    color: 'white',
                                }}
                            >{message?.message}</h3>
                        </div> :
                        <div style={{
                            marginRight: 'auto',
                            marginBottom: '3px',
                        }}>
                            <h3 style={{
                                marginLeft: '0.3rem',
                                borderRadius: '5px',
                                width: 'fit-content',
                                backgroundColor: '#F73859',
                                padding: '5px',
                                color: 'white',
                            }}>{message?.message}</h3>
                            {
                                (isSameAuthor(messages, message, index, userId) ||
                                    isLastMessage(messages, index, user?._id)) &&
                                (<>
                                    <Tooltip title={message.sender.name} arrow
                                    >
                                        <img src={message.sender.profilePicture} alt={'name'} style={{ height: '1.5rem', width: '1.5rem', borderRadius: '50%', marginTop: '3px' }} />
                                    </Tooltip>
                                </>
                                )
                            }
                        </div>
                    }
                </div>
            )}
        </ScrollableFeed>
    )
}

export default ChatBox