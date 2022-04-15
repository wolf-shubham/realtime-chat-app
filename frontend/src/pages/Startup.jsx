import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Login from '../components/Login';
import Register from '../components/Register';

const Startup = () => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Box sx={{ width: '50%', typography: 'body1' }} style={{ padding: '1rem' }}>
                <TabContext value={value} >
                    <Box sx={{ borderBottom: 2, borderColor: 'divider' }} >
                        <TabList onChange={handleChange} centered style={{
                            width: '100%'
                        }}>
                            <Tab label="Login" value="1" style={{ width: '50%' }
                            } />
                            <Tab label="Register" value="2" style={{ width: '50%' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{<Login />}</TabPanel>
                    <TabPanel value="2">{<Register />}</TabPanel>
                </TabContext>
            </Box >
        </>
    )
}

export default Startup