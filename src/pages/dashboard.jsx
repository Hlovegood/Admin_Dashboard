import React from 'react';
import './dashboard.css'
import Nav from '../Components/Nav';
import { Helmet } from 'react-helmet';
import TopBar from '../Components/TopBar';
import PageTitle from '../common/PageTitle';

const dashboard = () => {
    return ( <>
          <Helmet>
        <title>Login-HeshamAbozaid-490469420</title>
        <meta
          name="description"
          content="This is the Login Page for the admin dashboard"
        />
        <meta property="og:title" content="Login" />
      </Helmet>
    <Nav/>
    
      <TopBar/>
    <section className='Content'>

      <PageTitle Title="Dashboard Overview" SubTitle="Welcome back, here's what's happening with your projects today."/>


    </section>
    </> );
}
 
export default dashboard;