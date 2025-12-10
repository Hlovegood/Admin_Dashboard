import React from 'react';
import './TopBar.css'
import BellIcon from '../assets/Icons/Bell Icon.svg';
import SettingsIcon from '../assets/Icons/Settings Icon.svg';
import LogoutIcon from '../assets/Icons/Logout Icon.svg';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return ( <>
    <section className='TopBar'>
    <article className='TopBar-Content'>

        <Link to="/mail">
        <div className='IconHolder'>
            <img src={BellIcon} alt="Notification Bell Icon" className='Icon' />
        </div>
        </Link>

        <div className='IconHolder'>
            <img src={SettingsIcon} alt="Settings Icon"  className='Icon'/>
        </div>
        
        <Link to="/" className='LogoutLink'>
            <div className='IconHolder'>
                <img src={LogoutIcon} alt="Logout Icon"  className='Icon'/>
            </div>
        </Link>
    </article>

    </section>
    
    </> );
}
 
export default TopBar;