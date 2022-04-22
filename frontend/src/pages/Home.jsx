import React, { useState } from 'react'
import Chat from '../components/Chat'
import Header from '../components/Header'
import UserChatsList from '../components/UserChatsList'
import '../components/BorderBox.css'
import { ChatState } from '../context/ChatProvider'

const Home = () => {

    const { user } = ChatState()
    const [refetch, setRefetch] = useState(false)

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', height: '87vh', padding: '1rem' }}>
                {user && <div style={{ flex: '3', background: 'rgba(137, 227, 214, 0.5)' }} className='boxBorder'><UserChatsList refetch={refetch} /></div>}
                {user &&
                    <div style={{ flex: '9', marginLeft: '1rem', padding: '1rem', background: `rgba(240, 234, 237, 0.4)` }} className='boxBorder'><Chat refetch={refetch} setRefetch={setRefetch} /></div>}
            </div>
        </div>
    )
}

export default Home