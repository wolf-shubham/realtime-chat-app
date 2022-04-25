import React from 'react'

const UserList = ({ user, handleFunction }) => {
    return (
        <div
            onClick={handleFunction}
            style={{
                cursor: 'pointer',
                backgroundColor: "#D3DEDC",
                borderRadius: '5px',
                padding: '2px 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'left',
                marginBottom: '0.5rem'
            }}>
            <img
                src={user?.profilePicture}
                alt={user.name}
                style={{
                    height: '2.5rem',
                    width: '2.5rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    marginRight: '1rem'
                }}
            />
            <div>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>
        </div>
    )
}

export default UserList