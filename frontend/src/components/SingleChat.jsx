import React from 'react'

const SingleChat = ({ user }) => {
    const loggedUser = JSON.parse(localStorage.getItem('userInfo'))
    const userId = loggedUser.user._id
    const userName = user.users[0]._id === userId ? user.users[1].name : user.users[0].name
    return (
        <>
            <div >
                <h2>{!user.isGroupChat ? userName : user.chatTitle}</h2>
            </div>
        </>
    )
}

export default SingleChat