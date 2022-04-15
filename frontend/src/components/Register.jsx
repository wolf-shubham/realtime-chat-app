import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'


const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <>
            <div className="loginRight">
                <form className='loginForm'>
                    <h1 className='titleLogin'>Register</h1>
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

export default Register