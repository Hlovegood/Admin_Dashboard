import React from 'react';
import { Helmet } from "react-helmet";
import Nav from '../Components/Nav';
import TopBar from '../Components/TopBar';
import './dashboard.css';
import ProfileEditor from '../Components/ProfileEditor'
const Profile = () => {
    return ( <>
              <Helmet>
                <title>Profile</title>
                <meta name="description" content="This is the Profile Editing Page" />
                <meta property="og:title" content="Profile" />
              </Helmet>

        <Nav/>
        <div className='DashboardContainer'>

        <TopBar/>
        <section className='Content'>
            <ProfileEditor/>
        </section>

    
    
        </div>
    </> );
}
 
export default Profile;