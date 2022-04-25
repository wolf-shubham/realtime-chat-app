import { Button } from '@mui/material';
import React from 'react'

const UpdateProfilePic = ({ user }) => {
    return (
        <div
            style={{
                width: '25rem',
                height: '27rem',
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                flexDirection: 'column'
            }}
        >
            <h1>Update Profile Pic</h1>
            <img
                src={user.profilePicture}
                alt='geehh'
                style={{
                    height: '15rem',
                    width: '15rem',
                    borderRadius: '50%',
                    margin: '2rem 0rem'
                }}
            />
            <Button
                type="submit"
                sx={{ width: '75%' }}
                variant="contained"
                color="primary"
            >UPDATE
            </Button>
        </div>
    )
}

export default UpdateProfilePic