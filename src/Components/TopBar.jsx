import React from 'react';
import './TopBar.css'
import BellIcon from '../assets/Icons/Bell Icon.svg';
import SettingsIcon from '../assets/Icons/Settings Icon.svg';
const TopBar = () => {
    return ( <>
    <section className='TopBar'>
    <article className='TopBar-Content'>
        <div className='IconHolder'>
            <img src={BellIcon} alt="Notification Bell Icon" className='Icon' />
        </div>

        <div className='IconHolder'>
            <img src={SettingsIcon} alt="Settings Icon"  className='Icon'/>
        </div>
    </article>

    </section>
    
    </> );
}
 
export default TopBar;