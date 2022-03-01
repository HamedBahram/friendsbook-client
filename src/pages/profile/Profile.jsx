import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import Navbar from '../../components/layout/navbar/Navbar'
import Feed from '../../components/layout/feed/Feed'
import LeftSidebar from '../../components/layout/sidebar/LeftSidebar'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import coverPhoto from '../../assets/img/cover.jpg'
import avatar from '../../assets/img/avatar.png'

import styles from './Profile.module.css'

const Profile = () => {
    const [user, setUser] = useState({})
    const { username } = useParams()

    useEffect(() => {
        fetch(`/api/v1/users/profile/${username}`)
            .then(res => res.json())
            .then(({ user }) => {
                setUser(user)
            })
    }, [username])

    const { _id: userId } = user

    const URL = userId ? `/api/v1/users/${userId}/timeline` : ''
    const { loading, data, error } = useFetch(URL)
    const posts = data?.posts

    let content = <Feed posts={posts} />

    if (loading) {
        content = <LoadingSpinner />
    }

    if (error) {
        content = <p>{error.message || 'Something went wrong'}</p>
    }

    return (
        <>
            <Navbar />
            <div className={styles.profile}>
                <LeftSidebar />
                <div className={styles.main}>
                    <div className={styles.imageContainer}>
                        <img
                            className={styles.coverPhoto}
                            src={user.coverPicture || coverPhoto}
                            alt=''
                        />

                        <img
                            className={styles.profilePicture}
                            src={user.profilePicture || avatar}
                            alt=''
                        />
                    </div>
                    <div className={styles.userDetails}>
                        <h2>{user.username}</h2>
                    </div>
                    {content}
                </div>
            </div>
        </>
    )
}

export default Profile
