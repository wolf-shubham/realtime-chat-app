import React from 'react'
import Chat from '../components/Chat'
import Header from '../components/Header'
import UserChatsList from '../components/UserChatsList'

const Home = () => {
    return (
        <div>
            <Header />
            <div style={{ display: 'flex', height: '87vh', paddingTop: '1rem' }}>
                <div style={{ flex: '3' }}><UserChatsList /></div>
                <div style={{ flex: '9', border: '1px solid red', padding: '1rem' }}><Chat /></div>
            </div>

        </div>
    )
}

export default Home