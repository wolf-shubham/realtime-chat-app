import React, { useEffect, useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('userInfo')
        if (user) {
            navigate('/')
        }
    }, [navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' }
            }
            const { data } = await axios.post('/user/login', {
                email,
                password
            }, config)
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="loginRight">
                <form className='loginForm' onSubmit={handleSubmit}>
                    <h1 className='titleLogin'>LOGIN</h1>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        autoFocus
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

export default Login