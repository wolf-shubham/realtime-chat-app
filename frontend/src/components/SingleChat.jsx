import React from 'react'

const SingleChat = ({ user }) => {
    return (
        <>
            <h2>SingleChat</h2>
            <h3>{user.chatTitle}</h3>
        </>
    )
}

export default SingleChat