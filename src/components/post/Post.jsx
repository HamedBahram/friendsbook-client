import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import moment from 'moment'
import confetti from 'canvas-confetti'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RecommendIcon from '@mui/icons-material/Recommend'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import avatar from '../../assets/svg/avatar.svg'

import './Post.css'
import { useCallback } from 'react'

const Post = ({ post }) => {
    const { user: postUser } = post
    const { user, token } = useSession()

    const [likes, setLikes] = useState(post?.likes?.length || 0)
    const [liked, setLiked] = useState(post.likes.includes(user._id))
    const [likeError, setLikeError] = useState()
    const myPost = post.user._id === user._id

    const likeConfetti = useRef()
    const canvasRef = useCallback(node => {
        if (!node) return
        likeConfetti.current = likeConfetti.current || confetti.create(node)
    }, [])

    const handleLike = async () => {
        if (myPost) return

        if (!liked) {
            likeConfetti.current({
                origin: { x: 0.6 },
                startVelocity: 20,
                scalar: 0.5,
            })
        }

        try {
            const URL = liked
                ? `/api/v1/posts/${post._id}/unlike`
                : `/api/v1/posts/${post._id}/like`

            const res = await fetch(URL, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!res.ok) throw new Error()

            setLikes(likes => (liked ? likes - 1 : likes + 1))
            setLiked(liked => !liked)
        } catch (error) {
            setLikeError(error.message || 'Unable to update likes!')
        }
    }

    return (
        <div className='postContainer'>
            <div className='postWrapper'>
                <div className='postHeader'>
                    <div className='postDetails'>
                        <Link to={`/profile/${postUser.username}`}>
                            <img
                                src={postUser.profilePicture || avatar}
                                alt=''
                                className='postProfileImg'
                            />
                        </Link>
                        <div>
                            <div className='postUsername'>
                                {postUser.firstName
                                    ? postUser.firstName + ' ' + (postUser.lastName ?? '')
                                    : postUser.username}
                            </div>
                            <div className='postDate'>{moment(post.updated_at).fromNow()}</div>
                        </div>
                    </div>
                    <MoreHorizIcon className='postMoreIcon' />
                </div>
                <div className='postContent'>
                    <div className='postText'>{post.content}</div>
                    {post.img && <img className='postImg' src={post.img} alt='' />}
                </div>
                <div className='postFooter'>
                    <canvas
                        ref={canvasRef}
                        className='postLikeCanvas'
                        width='150'
                        height='300'
                    ></canvas>
                    <div className='postInteractions'>
                        <div className='postLikes'>
                            {likeError && <small style={{ color: 'red' }}>Unable to update!</small>}
                            <RecommendIcon
                                htmlColor={myPost ? '#ddd' : liked ? '#1877f2' : '#ddd'}
                            />
                            <span className='postLikesCount'>{likes}</span>
                        </div>
                        <div className='postComments'>{post.comments?.length} Comments</div>
                    </div>
                    <hr className='postFooterHr' />
                    <div className='postFooterIcons'>
                        <button onClick={handleLike} disabled={myPost}>
                            <ThumbUpIcon
                                className='postFooterIcon'
                                htmlColor={myPost ? '#999' : liked ? '#1877f2' : '#999'}
                            />
                            <span style={{ color: myPost ? '#999' : liked ? '#1877f2' : '#999' }}>
                                Like
                            </span>
                        </button>
                        <button>
                            <CommentIcon className='postFooterIcon' htmlColor='#999' />
                            <span>Comment</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
