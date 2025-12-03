import React from 'react';
import { Helmet } from "react-helmet";
import './Projects.css'
import Nav from '../Components/Nav';
import TopBar from '../Components/TopBar';
import ProjectHolder from '../Components/ProjectHolder';
import Edita from '../assets/Mockups/Edita Website.png'

const Projects = () => {
    return ( <>
          <Helmet>
            <title>Projects-HeshamAbozaid-490469420</title>
            <meta name="description" content="This is the Projects Page" />
            <meta property="og:title" content="Projects" />
          </Helmet>

          <Nav/>
            <div className='DashboardContainer'>

          <TopBar/>

          <section className='Content'>

                <section className='Projects'>
                    <ProjectHolder Mockup={Edita} ProjectTitle="Egyptian Food Brand Website"  Year = "2024"/>

                </section>


          </section>
    
            </div>
    
    </> );
}
 
export default Projects;