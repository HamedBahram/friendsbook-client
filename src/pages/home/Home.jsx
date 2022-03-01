import useFetch from '../../hooks/useFetch'
import { useSession } from '../../context/SessionContext'

import Navbar from '../../components/layout/navbar/Navbar'
import Feed from '../../components/layout/feed/Feed'
import LeftSidebar from '../../components/layout/sidebar/LeftSidebar'
import RightSidebar from '../../components/layout/sidebar/RightSidebar'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

import './Home.css'

const Home = () => {
    const { user } = useSession()
    const userId = user?._id
    const URL = userId ? `/api/v1/users/${userId}/newsfeed` : ''
    const { loading, data, error, setData } = useFetch(URL)
    const posts = data?.posts?.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

    const addPost = post => {
        setData(data => {
            return {
                posts: [post, ...data.posts],
            }
        })
    }

    let content = <Feed posts={posts} addPost={addPost} />

    if (loading) {
        content = <LoadingSpinner />
    }

    if (error) {
        content = <p>{error.message || 'Something went wrong'}</p>
    }

    return (
        <>
            <Navbar />
            <div className='homeContainer'>
                <LeftSidebar />
                {content}
                <RightSidebar />
            </div>
        </>
    )
}

export default Home
