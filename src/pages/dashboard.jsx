import React from 'react';
import Nav from '../Components/Nav';
import { Helmet } from 'react-helmet';

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
    
    </> );
}
 
export default dashboard;