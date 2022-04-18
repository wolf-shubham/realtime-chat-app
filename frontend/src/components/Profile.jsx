import React from 'react'
import { ChatState } from '../context/ChatProvider'

const Profile = () => {

    const { user } = ChatState()

    return (
        <>
            <div style={{ width: '25rem', height: '35rem', display: 'flex', alignItems: 'center', padding: '1rem', flexDirection: 'column' }}>
                <h1>Profile</h1>
                <img src={user?.user.profilePicture} alt={user?.user.name} style={{ height: '15rem', width: '15rem', borderRadius: '50%', margin: '2rem 0rem' }} />
                <h1 style={{ marginBottom: '0.5rem' }}>{user?.user.name}</h1>
                <h2>{user?.user.username}</h2>
                <h2 style={{ margin: '0.5rem 0rem' }}>{user?.user.email}</h2>
            </div>
        </>
    )
}

export default Profile