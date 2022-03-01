import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'
import Profile from '../pages/profile/Profile'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import { useSession } from '../context/SessionContext'

const App = () => {
    const { user } = useSession()

    return (
        <>
            <Routes>
                <Route path='/' element={user ? <Home /> : <Navigate to='login' replace />} />
                <Route path='login' element={user ? <Navigate to='/' replace /> : <Login />} />
                <Route
                    path='register'
                    element={user ? <Navigate to='/' replace /> : <Register />}
                />
                <Route
                    path='profile/:username'
                    element={user ? <Profile /> : <Navigate to='/login' replace />}
                />
            </Routes>
        </>
    )
}

export default App
