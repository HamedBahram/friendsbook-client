import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useSession } from '../../context/SessionContext'

import styles from './Login.module.css'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, loading, error } = useSession()

    // Check the routes in App for the alternative solution
    // useEffect(() => {
    //     if (user) {
    //         navigate('/')
    //     }
    // }, [navigate, user])

    const handleSubmit = e => {
        e.preventDefault()

        // validate using yup

        login({ email, password })
        setEmail('')
        setPassword('')
    }

    return (
        <div className={styles.login}>
            <div className={styles.wrapper}>
                <div>
                    <h3 className={styles.logo}>FriendsBook</h3>
                    <div className={styles.loginDescription}>Connect with your friends!</div>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <p className={styles.error}>{error}</p>}
                    {loading && (
                        <div className={styles.loading}>
                            <LoadingSpinner />
                        </div>
                    )}
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                    />
                    <button disabled={loading}>Login</button>
                    <hr className={styles.hr} />
                    <button type='button' onClick={() => navigate('/register')} disabled={loading}>
                        Create New Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
