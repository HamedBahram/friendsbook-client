import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext({
    auth: {
        auth_token: '',
        user: {
            _id: '',
            username: '',
            email: '',
            admin: false,
            coverPicture: '',
            profilePicture: '',
            followers: [],
            following: [],
            created_at: '',
            updated_at: '',
        },
    },
    setAuth: () => {},
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage('friendsbook:auth', {})

    const value = {
        auth,
        setAuth,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
