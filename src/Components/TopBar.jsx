import React from 'react';
import './TopBar.css'
import BellIcon from '../assets/Icons/Bell Icon.svg';
import SettingsIcon from '../assets/Icons/Settings Icon.svg';
const TopBar = () => {
    return ( <>
    <section>
    <article>
        <div>
            <img src={BellIcon} alt="Notification Bell Icon" />
        </div>

        <div>
            <img src={SettingsIcon} alt="Settings Icon" />
        </div>
    </article>

    </section>
    
    </> );
}
 
export default TopBar;