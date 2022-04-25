import { Button, Dialog, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import Profile from './Profile';
import UpdateProfilePic from './UpdateProfilePic';

const Header = () => {

    const { user } = ChatState()

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const [showProfile, setShowProfile] = useState(false)
    const [updateProfile, setUpdateProfile] = useState(false)
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
            <div
                style={{
                    display: 'flex',
                    width: '100%'
                }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        margin: '1rem 1rem 0rem',
                        padding: '1rem 2rem',
                        height: '11vh',
                        width: '100%',
                        background: `rgba(240, 234, 237, 0.5)`,
                        borderRadius: '0.4rem',
                    }}>
                    <h1
                        style={{
                            color: 'white',
                            fontFamily: font,
                            letterSpacing: '3px',
                            fontSize: '4rem',
                            fontWeight: '500'
                        }}>chatty...</h1>
                    <div
                        style={{
                            width: '15%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                        <img
                            src={user?.user.profilePicture}
                            alt={user?.user.name}
                            onClick={() => setUpdateProfile(true)}
                            style={{
                                height: '2.5rem',
                                width: '2.5rem',
                                borderRadius: '50%',
                                cursor: 'pointer'
                            }} />
                        <Button
                            onClick={handleClick}
                            variant="contained"
                            style={{
                                letterSpacing: '1px'
                            }}
                        >
                            {user?.user.name}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            style={{
                                marginTop: '0.3rem',
                                marginLeft: '1.6rem'
                            }}
                        >
                            <MenuItem
                                onClick={() => setShowProfile(!showProfile)} >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                    <Dialog
                        open={showProfile}
                        onClose={() => setShowProfile(!showProfile)}>
                        <Profile />
                    </Dialog >
                    <Dialog
                        open={updateProfile}
                        onClose={() => setUpdateProfile(!updateProfile)}>
                        <UpdateProfilePic user={user?.user} />
                    </Dialog>
                </div >
            </div>
        </>
    )
}

export default Header