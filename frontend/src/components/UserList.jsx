import React from 'react'

const UserList = ({ user }) => {
    return (
        <div>
            <div>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>
        </div>
    )
}

export default UserList