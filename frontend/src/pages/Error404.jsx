import React from 'react'
import Header from '../components/Header'

const Error404 = () => {
    return (
        <>
            <Header />
            <div
                style={{
                    display: 'flex',
                    height: '82vh',
                    padding: '1rem',
                    margin: '1rem',
                    borderRadius: '4px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(240, 234, 237, 0.4)'
                }}
            >
                <p
                    style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        color: "#FD5D5D"
                    }}
                >
                    Error 404. Not Found.
                </p>
            </div>
        </>
    )
}

export default Error404