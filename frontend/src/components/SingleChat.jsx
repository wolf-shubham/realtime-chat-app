import React from 'react'

const SingleChat = ({ user }) => {

    const loggedUser = JSON.parse(localStorage.getItem('userInfo'))
    const userId = loggedUser?._id
    const userName = user.users[0]._id === userId ? user.users[1].name : user.users[0].name
    const userPic = user.users[0]._id === userId ? user.users[1].profilePicture : user.users[0].profilePicture

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                {
                    !user.isGroupChat ?
                        <img src={userPic} alt={userName}
                            style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                            }}
                        />
                        :
                        <img
                            src="http://res.cloudinary.com/wolf-shubham/image/upload/v1650892228/pdbt3ukxtszo1ueuzto6.png"
                            alt={user.chatTitle}
                            style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '50%',
                            }}
                        />
                }

                <div style={{
                    marginLeft: '1rem',
                }}>
                    <h3>{!user.isGroupChat ? userName : user.chatTitle}</h3>
                    <h4><span
                        style={{
                            color: '#1C1427',
                            fontWeight: "bolder",
                        }}
                    >{user.lastMessage ? user.lastMessage.sender.name : null}:</span> <span
                        style={{
                            color: '#1B1C25',
                            fontWeight: 'bold',
                            textOverflow: 'ellipsis',
                        }}>{user.lastMessage ? (user.lastMessage.message.length > 15 ? user.lastMessage.message.substring(0, 14) + '...' : user.lastMessage.message) : null}</span>
                    </h4>

                </div>
            </div >
        </>
    )
}

export default SingleChat