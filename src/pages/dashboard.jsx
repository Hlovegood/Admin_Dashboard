import React from 'react';
import Nav from '../Components/Nav';
import { Helmet } from 'react-helmet';
import TopBar from '../Components/TopBar';

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
    
    <section>
      <TopBar/>

      


    </section>
    </> );
}
 
export default dashboard;