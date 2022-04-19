import React from 'react'
import { ChatState } from '../context/ChatProvider'
import Users from './Users'
import './Scrollbar.css'

const UserChatsList = () => {
    // const { user } = ChatState()
    // console.log(user);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div style={{ height: '15vh', paddingLeft: '1rem' }}>
                    <h1>chat list</h1>
                    <input type="text" />
                </div>
                <div className='scrollBar'>
                    <Users />
                    <Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users /><Users />
                    <Users /><Users /><Users /><Users />
                </div>
            </div>
        </>
    )
}

export default UserChatsList