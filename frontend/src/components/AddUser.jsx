import React from 'react'

const AddUser = ({ user, handleFunction }) => {
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem',
                padding: '0 0.5rem',
                backgroundColor: '#6BCB77',
                borderRadius: '2px',
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
                <h3 style={{ marginRight: '0.5rem' }}>{user.name}</h3>
                <i className="fa-solid fa-xmark" onClick={handleFunction}></i>
            </div>
        </>
    )
}

export default AddUser