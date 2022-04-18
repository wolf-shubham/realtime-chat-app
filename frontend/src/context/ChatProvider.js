import { createContext, useEffect, useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState()

    useEffect(() => {
        const user = localStorage.getItem('userInfo')
        setUser(JSON.parse(user))
    }, [])

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider
