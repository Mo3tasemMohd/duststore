import * as React from 'react'

export function useAuth() {
    const [user, setUser] = React.useState(null)
    const [token, setToken] = React.useState<string | null>(null)

    React.useEffect(() => {
        const token = window.localStorage.getItem('token')
        setToken(token)

        const user = window.localStorage.getItem('user')
        setUser(user ? JSON.parse(user) : null)
    }
    , [])

    const saveUser = React.useCallback((user: any) => {
        window.localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
    }, [])

    const saveToken = React.useCallback((token: string) => {
        window.localStorage.setItem('token', token)
        setToken(token)
    }, [])

    const logout = React.useCallback(() => {
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
        setUser(null)
        setToken(null)
    }, [])

    return { token, user, saveUser, saveToken, logout }
}