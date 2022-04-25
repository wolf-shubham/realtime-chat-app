import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [createChat, setCreateChat] = useState()
    const [fetchChats, setFetchChats] = useState([])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        const userToken = JSON.parse(localStorage.getItem("token"));
        setToken(userToken);

        if (!userInfo) navigate("/")
    }, [navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser, token, setToken, createChat, setCreateChat, fetchChats, setFetchChats }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider
