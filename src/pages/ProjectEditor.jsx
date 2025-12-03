import React from 'react';
import { Helmet } from "react-helmet";
import './ProjectEditor.css';
import Nav from '../Components/Nav'
import TopBar from '../Components/TopBar';
const ProjectEditor = () => {
    return ( <>
              <Helmet>
                <title>Project-Editor-HeshamAbozaid-490469420</title>
                <meta name="description" content="This is the Project Editor Page" />
                <meta property="og:title" content="Project Editor" />
              </Helmet>

      <Nav />

      <div className="DashboardContainer">
        <TopBar/>
        <section className='Content'>

        </section>

      </div>

    </> );
}
 
export default ProjectEditor;