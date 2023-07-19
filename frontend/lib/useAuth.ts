import * as React from 'react'

export function useAuth() {
    const [token, setToken] = React.useState<string | null>(null)

    React.useEffect(() => {
        const token = window.localStorage.getItem('token')
        setToken(token)
    }
    , [])

    const saveToken = (token: string) => {
        window.localStorage.setItem('token', token)
        setToken(token)
    }

    const deleteToken = () => {
        window.localStorage.removeItem('token')
        setToken(null)
    }

    return { token, saveToken, deleteToken }
}