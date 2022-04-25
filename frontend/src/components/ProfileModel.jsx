import React from 'react'

const ProfileModel = ({ user, groupChat, chatDetails }) => {

    // console.log(user)
    // console.log(groupChat)
    // console.log(chatDetails)
    return (
        <div
            style={{
                width: '25rem',
                height: '35rem',
                display: 'flex',
                padding: '1rem',
                flexDirection: 'column'
            }}
            className='scrollBar'
        >

            {
                groupChat ? (
                    <>
                        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Group Participants</h1>
                        {chatDetails?.users.map(user =>
                            <div
                                key={user._id}
                                style={{
                                    display: 'flex',
                                    padding: '0.5rem',
                                }}

                            >
                                <img
                                    src={user.profilePicture}
                                    alt={user.name}
                                    style={{
                                        height: '2.5rem',
                                        width: '2.5rem',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        marginLeft: '1rem'
                                    }}
                                />
                                <h3 style={{ marginLeft: '1rem' }}>{user.name}</h3>
                            </div>
                        )}
                    </>
                ) :
                    <>
                        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>User</h1>
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <img
                                src={user.profilePicture}
                                alt={user.name}
                                style={{
                                    height: '2.5rem',
                                    width: '2.5rem',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    marginLeft: '1rem'
                                }}
                            />
                            <h3 style={{ marginLeft: '1rem' }}>{user.name}</h3>
                        </div>
                    </>
            }

        </div>
    )
}

export default ProfileModel