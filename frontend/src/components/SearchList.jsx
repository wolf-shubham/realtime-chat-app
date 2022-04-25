import React from 'react'

const SearchList = ({ user, handleFunction }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
        }}>
            <img
                src={user.profilePicture}
                alt={user.name}
                style={{
                    height: '3rem',
                    width: '3rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    marginTop: '7px',
                    marginRight: '1rem'
                }}
            />
            <div
                style={{
                    margin: '0 3rem 0 0rem'
                }}>
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
            </div>
            <span className="material-icons" onClick={handleFunction}>
                add_circle_outline
            </span>
        </div>
    )
}

export default SearchList