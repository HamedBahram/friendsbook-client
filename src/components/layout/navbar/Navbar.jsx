import { Link } from 'react-router-dom'
import { useSession } from '../../../context/SessionContext'

import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat'
import NotificationsIcon from '@mui/icons-material/Notifications'
import avatar from '../../../assets/svg/avatar.svg'

import './Navbar.css'

const Navbar = () => {
    const { user } = useSession()
    return (
        <div className='navbarContainer'>
            <div className='navbarLeft'>
                <Link to='/'>
                    <span className='navbarLogo'>Friendsbook</span>
                </Link>
            </div>
            <div className='navbarCenter'>
                <div className='searchBar'>
                    <SearchIcon className='searchIcon' />
                    <input
                        type='text'
                        className='searchInput'
                        placeholder='Search for friends, posts or videos'
                    />
                </div>
            </div>
            <div className='navbarRight'>
                <div className='navbarLinks'>
                    <span className='navbarLink'>Homepage</span>
                    <span className='navbarLink'>Timeline</span>
                </div>
                <div className='navbarIcons'>
                    <div className='navbarIconItem'>
                        <PersonIcon />
                        <span className='navbarIconBadge'>1</span>
                    </div>
                    <div className='navbarIconItem'>
                        <ChatIcon />
                        <span className='navbarIconBadge'>2</span>
                    </div>
                    <div className='navbarIconItem'>
                        <NotificationsIcon />
                        <span className='navbarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture || avatar} alt='' className='navbarProfileImg' />
                </Link>
            </div>
        </div>
    )
}

export default Navbar
