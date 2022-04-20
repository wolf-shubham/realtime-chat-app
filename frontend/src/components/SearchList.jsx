import React from 'react'

const SearchList = ({ user, handleFunction }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
        }}>
            <div style={{ marginRight: '2rem' }}>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>
            <span class="material-icons" onClick={handleFunction}>
                add_circle_outline
            </span>
        </div>
    )
}

export default SearchList