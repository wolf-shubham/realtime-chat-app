import { Button, Dialog, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import Profile from './Profile';

const Header = () => {

    const { user } = ChatState()

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const [showProfile, setShowProfile] = useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const font = `'Great Vibes', cursive`

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0rem 2rem', height: '13vh' }}>
                <h1 style={{ color: 'white', fontFamily: font, letterSpacing: '3px', fontSize: '4rem', fontWeight: '500' }}>chatty...</h1>
                <div style={{ width: '15%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <img src={user?.user.profilePicture} alt={user?.user.name} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%' }} />
                    <Button
                        onClick={handleClick}
                        variant="contained"
                        style={{ letterSpacing: '1px' }}
                    >
                        {user?.user.name}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        style={{ marginTop: '0.3rem', marginLeft: '1.6rem' }}
                    >
                        <MenuItem onClick={() => setShowProfile(!showProfile)} >Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
                <Dialog open={showProfile} onClose={() => setShowProfile(!showProfile)}>
                    <Profile />
                </Dialog >
            </div >
        </>
    )
}

export default Header