import React from 'react';
import MailComp from '../Components/MailComp';
import './dashboard.css'
import Nav from '../Components/Nav';
import TopBar from './../Components/TopBar';
const Mail = () => {
    return ( <>
    <Nav/>
    <div className='DashboardContainer'>
        <TopBar/>
        <div className='Content'>
    <MailComp/>
        </div>
    </div>
    
    </> );
}
 
export default Mail;