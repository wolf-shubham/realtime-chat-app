import React from 'react'
import { ChatState } from '../context/ChatProvider'

const MessageBox = () => {

    const { user, createChat, setCreateChat } = ChatState()

    const userName = createChat?.users[0]._id === user?.user._id ? createChat?.users[1].name : createChat?.users[0].name

    return (
        <>
            {
                createChat ?
                    <>
                        {!createChat.isGroupChat ?
                            (
                                <>
                                    <h2>{!user.isGroupChat ? userName : user.chatTitle}</h2>
                                </>
                            ) :
                            (
                                <>
                                    <h2>{createChat.chatTitle.toUpperCase()}</h2>
                                </>
                            )
                        }
                    </> :
                    (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <h2>Select Chat To Start...</h2>
                        </div>
                    )
            }
        </>
    )
}

export default MessageBox