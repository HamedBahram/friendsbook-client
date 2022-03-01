import { useEffect, createContext, useContext, useReducer, useCallback } from 'react'

const loadJSON = key => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const SESSION_ACTIONS = {
    SEND: 'SEND',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

const initialState = {
    loading: false,
    error: null,
    user: null,
    token: null,
}

const init = key => {
    return loadJSON(key) || initialState
}

const reducer = (session, action) => {
    switch (action.type) {
        case SESSION_ACTIONS.SEND:
            return {
                loading: true,
                error: null,
                user: null,
                token: null,
            }
        case SESSION_ACTIONS.SUCCESS:
            return {
                loading: false,
                error: null,
                user: action.result.user,
                token: action.result.auth_token,
            }
        case SESSION_ACTIONS.ERROR:
            return {
                loading: false,
                error: action.error,
                user: null,
                token: null,
            }
        default:
            return session
    }
}

const SessionContext = createContext({
    loading: false,
    error: null,
    user: null,
    token: null,
    login: () => {},
    logout: () => {},
    register: () => {},
})

export const useSession = () => useContext(SessionContext)

const SessionProvider = ({ children }) => {
    const [session, dispatch] = useReducer(reducer, 'friendsbook:session', init)
    const { user, token } = session

    useEffect(() => {
        saveJSON('friendsbook:session', { user, token })
    }, [user, token])

    const login = useCallback(async ({ email, password }) => {
        try {
            dispatch({ type: SESSION_ACTIONS.SEND })

            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Login failed')

            dispatch({ type: SESSION_ACTIONS.SUCCESS, result })
        } catch (error) {
            dispatch({ type: SESSION_ACTIONS.ERROR, error: error.message })
        }
    }, [])

    const logout = () => {}

    const register = useCallback(async ({ username, email, password }) => {
        try {
            dispatch({ type: SESSION_ACTIONS.SEND })

            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'Login failed')

            dispatch({ type: SESSION_ACTIONS.SUCCESS, result })
        } catch (error) {
            dispatch({ type: SESSION_ACTIONS.ERROR, error: error.message })
        }
    }, [])

    const value = {
        ...session,
        login,
        logout,
        register,
    }

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export default SessionProvider
