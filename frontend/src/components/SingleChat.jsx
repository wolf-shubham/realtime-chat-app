import React from 'react'

const SingleChat = ({ user }) => {
    console.log(user)
    const loggedUser = JSON.parse(localStorage.getItem('userInfo'))
    const userId = loggedUser.user._id
    const userName = user.users[0]._id === userId ? user.users[1].name : user.users[0].name
    const userPic = user.users[0]._id === userId ? user.users[1].profilePicture : user.users[0].profilePicture
    // const lastMessage = 
    return (
        <>
            <div style={{}}>
                <h2>{!user.isGroupChat ? userName : user.chatTitle}</h2>
                <img src={userPic} alt={userName}
                    style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                    }}
                />
                <h4>{user.lastMessage.sender.name} <span>{user.lastMessage.message}</span></h4>
            </div>
        </>
    )
}

export default SingleChat