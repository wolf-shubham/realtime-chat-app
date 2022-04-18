import React from 'react'
import Chat from '../components/Chat'
import Header from '../components/Header'
import UserChats from '../components/UserChats'

const Home = () => {
    return (
        <div>
            <Header />
            <UserChats />
            <Chat />
        </div>
    )
}

export default Home