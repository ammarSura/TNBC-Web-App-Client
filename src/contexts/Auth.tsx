import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import axios from "../utils/axios-init";

type tokensType = {
    accessToken: string
    accessTokenExpiresAt: number
    refreshToken: string
    refreshTokenExpiresAt: number
}

type UserType = {email: string, name: string, designation: string}
type AuthContextType = {
    login: (tokens: tokensType) => void
    loginWithIdToken: (idToken: string) => void
    loginWithRefreshToken: (refreshToken: string) => Promise<null> | Promise<string>
    logout: () => void
    accessToken: string | null
    refreshToken: string | null
    accessTokenExpiresAt: number | null
    refreshTokenExpiresAt: number | null
    isAuthenticated: boolean
    setAccessToken: (accessToken: string | null) => void
    setRefreshToken: (refreshToken: string | null) => void
    setAccessTokenExpiresAt: (accessTokenExpiresAt: number | null) => void
    setRefreshTokenExpiresAt: (refreshTokenExpiresAt: number | null) => void
    user: UserType | null
}
export const AuthContext = createContext({} as AuthContextType)

export function useAuth() {
    return useContext(AuthContext)
}


const AuthProvider = ({ children }: { children: ReactNode | undefined }) => {
    const isAuthenticatedDefault = localStorage.getItem('isAuthenticated') === 'true'
    const accessTokenDefault = localStorage.getItem('accessToken')
    const refreshTokenDefault = localStorage.getItem('refreshToken')
    const refreshTokenExpiresAtDefault = localStorage.getItem('refreshTokenExpiresAt') ? parseInt(localStorage.getItem('refreshTokenExpiresAt') as string) : null
    const accessTokenExpiresAtDefault = localStorage.getItem('accessTokenExpiresAt') ? parseInt(localStorage.getItem('accessTokenExpiresAt') as string) : null
    const [accessToken, setAccessToken] = useState(accessTokenDefault)
    const [refreshToken, setRefreshToken] = useState(refreshTokenDefault)
    const [refreshTokenExpiresAt, setRefreshTokenExpiresAt] = useState(refreshTokenExpiresAtDefault)
    const [accessTokenExpiresAt, setAccessTokenExpiresAt] = useState(accessTokenExpiresAtDefault)
    const [isAuthenticated, setIsAuthenticated] = useState(isAuthenticatedDefault)
    const [user, setUser] = useState<UserType | null>(null)
    // const axios = useAxios()

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated, accessToken, accessTokenDefault)
        if(isAuthenticated && accessToken) {
            getUser()
        }
    }, [isAuthenticated, accessToken])

    const loginWithIdToken = async(idToken: string) => {
        const response = await axios.post('/login', { idToken })
        if(response.status === 200) {
            login(response.data)
        }

    }

    const loginWithRefreshToken = async() => {
        const response = await axios.post('/refresh', { refreshToken })
        if(response.status === 200) {
            login(response.data)
            return response.data.accessToken
        } else {
            logout()
            return null
        }
    }

    const login = ({
        accessToken,
        refreshToken,
        refreshTokenExpiresAt,
        accessTokenExpiresAt
    }: tokensType) => {

        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('refreshTokenExpiresAt', refreshTokenExpiresAt.toString())
        localStorage.setItem('accessTokenExpiresAt', accessTokenExpiresAt.toString())
        localStorage.setItem('isAuthenticated', 'true')
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        setRefreshTokenExpiresAt(refreshTokenExpiresAt)
        setAccessTokenExpiresAt(accessTokenExpiresAt)
        setIsAuthenticated(true)

        getUser()
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('refreshTokenExpiresAt')
        localStorage.removeItem('accessTokenExpiresAt')
        localStorage.removeItem('isAuthenticated')
        setAccessToken(null)
        setRefreshToken(null)
        setRefreshTokenExpiresAt(null)
        setAccessTokenExpiresAt(null)
        setIsAuthenticated(false)
    }

    const getUser = async() => {
        console.log('getting user')
        const response = await axios.get('/user', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        console.log(response)
        if(response.status === 200) {
            console.log(response.data)
            setUser(response.data)
        }
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            login,
            logout,
            isAuthenticated,
            accessTokenExpiresAt,
            refreshTokenExpiresAt,
            refreshToken,
            loginWithIdToken,
            setAccessToken,
            setRefreshToken,
            setAccessTokenExpiresAt,
            setRefreshTokenExpiresAt,
            loginWithRefreshToken,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
