import NewPost from '../../post/NewPost'
import Post from '../../post/Post'
import Card from '../../ui/Card'
import CampaignIcon from '@mui/icons-material/Campaign'

import './Feed.css'

const Feed = ({ posts = [], addPost }) => {
    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <NewPost addPost={addPost} />
                {posts.length === 0 && (
                    <Card>
                        <div className='noPostContainer'>
                            <CampaignIcon htmlColor='tomato' />
                            <small>No posts here. Try creating one...</small>
                        </div>
                    </Card>
                )}
                {posts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Feed
