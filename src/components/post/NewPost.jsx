import { useState, useRef } from 'react'
import { useSession } from '../../context/SessionContext'

import LoadingSpinner from '../ui/LoadingSpinner'
import PermMediaIcon from '@mui/icons-material/PermMedia'
import LabelIcon from '@mui/icons-material/Label'
import RoomIcon from '@mui/icons-material/Room'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import CloseIcon from '@mui/icons-material/Close'
import avatar from '../../assets/svg/avatar.svg'

import './NewPost.css'

const NewPost = ({ addPost }) => {
    const [imageURL, setImageURL] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { user, token } = useSession()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    const dismissError = () => {
        setError(null)
    }

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleChange = e => {
        const files = e.currentTarget.files
        if (files.length === 0) return

        setError(null)
        const file = files.item(0)
        if (!file.type.startsWith('image')) {
            setError('Please select an Image file')
            e.currentTarget.value = null
            return
        }

        const reader = new FileReader()
        reader.onload = loadEvent => {
            const { result } = loadEvent.target
            setImageURL(result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            if (!textInputRef.current.value.trim() && !imageURL) {
                textInputRef.current.focus()
                return
            }

            setLoading(true)
            setError(null)

            const formData = new FormData(e.currentTarget)
            const content = formData.get('content')
            const file = formData.get('file')
            if (!file.type.startsWith('image') && file.size !== 0) {
                setError('Please select an Image file')
                setLoading(false)
                return
            }
            e.currentTarget.reset()

            let img_url
            if (file.size !== 0) {
                formData.delete('content')
                formData.append('upload_preset', 'friendsbook')

                const URL = `https://api.cloudinary.com/v1_1/dtijo8xha/image/upload`
                const data = await fetch(URL, {
                    method: 'POST',
                    body: formData,
                }).then(res => res.json())

                img_url = data?.secure_url
                if (!img_url) throw new Error('Failed while uploading the file.')
            }

            const { post } = await fetch('/api/v1/posts', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, img: img_url || '' }),
            }).then(res => res.json())

            if (!post) throw new Error('Failed while creating the post.')

            textInputRef.current.value = ''
            setImageURL('')
            addPost(post)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='newPostContainer'>
            <form className='newPostWrapper' onSubmit={handleSubmit}>
                <div className='newPostHeader'>
                    <img src={user.profilePicture || avatar} alt='' className='newPostProfileImg' />
                    <input
                        type='text'
                        name='content'
                        ref={textInputRef}
                        className='newPostInput'
                        placeholder={`What's on your mind, ${user.firstName || user.username}?`}
                    />
                </div>
                <hr className='newPostHr' />
                {error && (
                    <div className='errorContainer'>
                        <p className='error'>{error}</p>
                        <CloseIcon onClick={dismissError} className='errorDismissButton' />
                    </div>
                )}
                {loading && (
                    <div className='loadingSpinnerContainer'>
                        <LoadingSpinner />
                    </div>
                )}
                {imageURL && <img src={imageURL} alt='' className='newPostImage' />}
                <div className='newPostFooter'>
                    <div className='newPostOptions'>
                        <button type='button' className='newPostOption' onClick={openFilePicker}>
                            <PermMediaIcon htmlColor='tomato' className='newPostOptionIcon' />
                            <span className='newPostOptionText'>Photo/Video</span>
                            <input
                                type='file'
                                name='file'
                                ref={fileInputRef}
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                        </button>
                        <button type='button' className='newPostOption'>
                            <LabelIcon htmlColor='dodgerblue' className='newPostOptionIcon' />
                            <span className='newPostOptionText'>Tag</span>
                        </button>
                        <button type='button' className='newPostOption'>
                            <RoomIcon htmlColor='limegreen' className='newPostOptionIcon' />
                            <span className='newPostOptionText'>Location</span>
                        </button>
                        <button type='button' className='newPostOption'>
                            <EmojiEmotionsIcon htmlColor='orange' className='newPostOptionIcon' />
                            <span className='newPostOptionText'>Feeling</span>
                        </button>
                    </div>
                    <button className='newPostButton'>Share</button>
                </div>
            </form>
        </div>
    )
}

export default NewPost
