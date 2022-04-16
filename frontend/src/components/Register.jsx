import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import axios from 'axios'


const Register = () => {

    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, username, email, password)
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            }
            const { data } = await axios.post('/user/register', {
                name,
                username,
                email,
                password
            }, config)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="loginRight">
                <form className='loginForm' onSubmit={handleSubmit}>
                    <h1 className='titleLogin'>REGISTER</h1>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={name}
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me" checked
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    // disabled={loading}
                    >LOGIN</Button>
                </form>
                {/* {error && <Error message={error} /> */}
            </div>
        </>
    )
}

export default Register