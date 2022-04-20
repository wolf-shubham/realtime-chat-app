import React from 'react'

const AddUser = ({ user, handleFunction }) => {
    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '1rem',
                padding: '0 0.5rem',
                backgroundColor: '#6BCB77',
                borderRadius: '2px',
            }}>
                <h3 style={{ marginRight: '0.5rem' }}>{user.name}</h3>
                <i class="fa-solid fa-xmark" onClick={handleFunction}></i>
            </div>
        </>
    )
}

export default AddUser