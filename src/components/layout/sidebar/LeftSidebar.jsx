import RssFeedIcon from '@mui/icons-material/RssFeed'
import ChatIcon from '@mui/icons-material/Chat'
import GroupIcon from '@mui/icons-material/Group'
import EventIcon from '@mui/icons-material/Event'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import './LeftSidebar.css'

import { users } from '../../../dummyData'

const LeftSidebar = () => {
    return (
        <div className='leftSidebar'>
            <div className='sidebarWrapper'>
                <ul className='sidebarList'>
                    <li className='sidebarListItem'>
                        <RssFeedIcon />
                        <span className='sidebarListItemText'>Feed</span>
                    </li>
                    <li className='sidebarListItem'>
                        <ChatIcon />
                        <span className='sidebarListItemText'>Messages</span>
                    </li>
                    <li className='sidebarListItem'>
                        <GroupIcon />
                        <span className='sidebarListItemText'>Groups</span>
                    </li>
                    <li className='sidebarListItem'>
                        <EventIcon />
                        <span className='sidebarListItemText'>Events</span>
                    </li>
                    <li className='sidebarListItem'>
                        <WorkOutlineIcon />
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>
                </ul>
                <button className='sidebarButton'>
                    <KeyboardArrowDownIcon className='sidebarButtonIcon' />
                    <span>See More</span>
                </button>
                <hr className='sidebarHr' />
                <ul className='sidebarFriendList'>
                    {users.map(user => (
                        <li key={user.id} className='sidebarFriend'>
                            <img src={user.profilePicture} alt='' className='sidebarFriendImg' />
                            <span className='sidebarFriendName'>{user.username}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LeftSidebar
