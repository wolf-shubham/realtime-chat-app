import { Button, Dialog } from '@mui/material'
import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import ProfileModel from './ProfileModel'

const MessageBox = () => {

    const { user, createChat, setCreateChat } = ChatState()
    const [openProfile, setOpenProfile] = useState(false)

    const userName = createChat?.users[0]._id === user?.user._id ? createChat?.users[1].name : createChat?.users[0].name

    const selectedUser = createChat?.users[0]._id === user?.user._id ? createChat?.users[1] : createChat?.users[0]

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
                        <Button
                            onClick={() => setOpenProfile(true)}
                        >profile</Button>

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

            <Dialog open={openProfile} onClose={() => setOpenProfile(!openProfile)}>

                <ProfileModel user={selectedUser} chatDetails={createChat} groupChat={createChat?.isGroupChat} />
            </Dialog >
        </>
    )
}

export default MessageBox