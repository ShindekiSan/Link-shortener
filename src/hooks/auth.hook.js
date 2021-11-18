import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData'

export function useAuth ()  {
    const [token, setToken] = useState(null)
    const [userName, setUserName] = useState(null)

    const login = useCallback((jwtToken, name) => {
        setToken(jwtToken)
        setUserName(name)

        localStorage.setItem(storageName, JSON.stringify({
            userName: name, token: jwtToken
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserName(null)

        localStorage.removeItem(storageName)
        window.location.reload();
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userName)
        }
    }, [login])

    return { login, logout, token, userName}
}