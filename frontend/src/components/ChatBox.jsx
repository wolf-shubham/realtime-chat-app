import React from 'react'
import { ChatState } from '../context/ChatProvider'
import ScrollableFeed from "react-scrollable-feed"

const ChatBox = ({ messages }) => {
    const { user } = ChatState()
    const userId = user?.user._id

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
        <ScrollableFeed>
            {messages && messages?.map((message, index) =>
                <div key={message?._id} style={{ display: 'flex' }}>
                    <h1 >{index + 1} {message?.message} by {message.sender.name}</h1>
                    {
                        (isSameAuthor(messages, message, index, userId) ||
                            isLastMessage(messages, index, user?.user._id)) &&
                        (<>
                            <img src={message.sender.profilePicture} alt={'name'} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%' }} />
                            {/* <h3> {message.message} by <span style={{ backgroundColor: 'greenyellow' }}>{message.sender.name}</span> </h3>*/}
                        </>
                        )

                    }
                    {/* <h2>{message.message}</h2> */}
                </div>
            )}
        </ScrollableFeed>
    )
}

export default ChatBox