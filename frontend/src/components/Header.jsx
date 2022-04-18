import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { ChatState } from '../context/ChatProvider';

const Header = () => {

    const { user } = ChatState()

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const font = `'Great Vibes', cursive`

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0rem 2rem' }}>
            <h1 style={{ color: 'white', fontFamily: font, letterSpacing: '3px', fontSize: '4rem', fontWeight: '500' }}>chatty...</h1>
            <div style={{ width: '14%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginRight: '1rem' }}>
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
                    <MenuItem onClick={handleClose} >Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Header