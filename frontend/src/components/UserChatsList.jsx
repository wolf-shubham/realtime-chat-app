import React, { useState } from 'react'
import Users from './Users'
import './Scrollbar.css'
import { Button, Dialog } from '@mui/material'
import SearchUser from './SearchUser'

const UserChatsList = () => {
    // const { user } = ChatState()
    // console.log(user);
    const [searchUser, setSearchUser] = useState(false)

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                <div style={{ height: '9vh', display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
                    <Button
                        onClick={() => setSearchUser(!searchUser)}
                        sx={{ width: '75%' }}
                        variant="contained"
                        color="primary">
                        Search user
                        <i class="fa-solid fa-magnifying-glass"
                            style={{
                                marginLeft: '1rem',
                                fontSize: '1.2rem'
                            }}></i>
                    </Button>
                </div>
                <div className='scrollBar'>
                    <Users />
                </div>
            </div>
            <Dialog open={searchUser} onClose={() => setSearchUser(!searchUser)}>
                <SearchUser />
            </Dialog >
        </>
    )
}

export default UserChatsList