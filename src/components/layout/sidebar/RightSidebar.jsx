import CakeIcon from '@mui/icons-material/Cake'
import './RightSidebar.css'

import { users } from '../../../dummyData'

const RightSidebar = () => {
    return (
        <div className='rightSidebar'>
            <div className='rightSidebarWrapper'>
                <div className='birthdayContainer'>
                    <div className='birthdayWrapper'>
                        <div className='birthdayHeader'>
                            <CakeIcon htmlColor='tomato' />
                            <span>Birthdays</span>
                        </div>
                        <div className='birthdayContent'>
                            <strong>Yuri</strong> and <strong>3 other friends</strong> have
                            birthdays today
                        </div>
                    </div>
                </div>
                <div className='rightSidebarAds'>
                    <h4>Sponsored</h4>
                    <img
                        className='rightSidebarAdImg'
                        src='https://images.pexels.com/photos/788662/pexels-photo-788662.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        alt=''
                    />
                    <img
                        className='rightSidebarAdImg'
                        src='https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                        alt=''
                    />
                </div>
                <div className='rightSidebarContacts'>
                    <h4>Contacts</h4>
                    <ul className='rightSidebarContactList'>
                        {users.map(user => (
                            <li key={user.id} className='rightSidebarContact'>
                                <div className='rightSidebarContactImgContainer'>
                                    <img
                                        className='rightSidebarContactImg'
                                        src={user.profilePicture}
                                        alt=''
                                    />
                                    <div className='onlineContact'></div>
                                </div>
                                <span>{user.username}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RightSidebar
