import React from 'react'
import Chat from '../components/Chat'
import Header from '../components/Header'
import UserChatsList from '../components/UserChatsList'
import '../components/BorderBox.css'

const Home = () => {

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', height: '87vh', padding: '1rem' }}>
                <div style={{ flex: '3' }} className='boxBorder'><UserChatsList /></div>
                <div style={{ flex: '9', marginLeft: '1rem', padding: '1rem' }} className='boxBorder'><Chat /></div>
            </div>

        </div>
    )
}

export default Home