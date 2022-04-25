import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';

const UpdateProfilePic = () => {

    const { user, setUser, token } = ChatState()

    const [pic, setPic] = useState('')

    const postDetails = (profilepic) => {
        const file = profilepic

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setPic(Reader.result);
            }
        }

        const data = new FormData()
        data.append("file", profilepic)
        data.append("upload_preset", "meeting_app")
        data.append("cloud_name", "wolf-shubham")
        fetch("https://api.cloudinary.com/v1_1/wolf-shubham/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPic(data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!pic) {
            alert('Please select a file')
            return
        }
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.put(`/user/updateprofilepic`, {
                profilepicurl: pic
            }, config)
            console.log(data)
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

    }, [user])

    return (
        <div
            style={{
                width: '25rem',
                height: '31rem',
                padding: '1rem',
            }}
        >
            <form onSubmit={submitHandler}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <h1>Update Profile Pic</h1>
                <img
                    src={user?.profilePicture}
                    alt={user?.name}
                    style={{
                        height: '15rem',
                        width: '15rem',
                        borderRadius: '50%',
                        margin: '2rem 0rem'
                    }}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="pic"
                    type="file"
                    id="displaypic"
                    // value={pic}
                    onChange={(e) => postDetails(e.target.files[0])}
                />
                <Button
                    type="submit"
                    sx={{ width: '75%' }}
                    variant="contained"
                    color="primary"
                >UPDATE
                </Button>
            </form>
        </div>
    )
}

export default UpdateProfilePic