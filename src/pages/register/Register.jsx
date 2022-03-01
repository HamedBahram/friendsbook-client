import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

import styles from './Register.module.css'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { register, loading, error } = useSession()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (user) {
    //         navigate('/')
    //     }
    // }, [navigate, user])

    const handleSubmit = async e => {
        e.preventDefault()

        // validate using yup

        register({ username, email, password })
        setEmail('')
        setPassword('')
        setUsername('')
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
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Username'
                        required
                    />
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
                    <button disabled={loading}>Create New Account</button>
                    <hr className={styles.hr} />
                    <button type='button' onClick={() => navigate('/login')} disabled={loading}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
