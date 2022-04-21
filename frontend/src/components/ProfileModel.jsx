import React from 'react'

const ProfileModel = ({ user, groupChat, chatDetails }) => {
    return (
        <div>
            <h1>ProfileModel</h1>
            {
                groupChat ? (
                    <>
                        {chatDetails?.users.map(user =>
                            <div key={user._id}>
                                <h3>{user.name}</h3>
                            </div>
                        )}
                    </>
                ) : <h3>{user.name}</h3>
            }

        </div>
    )
}

export default ProfileModel