import React from "react";
import { Helmet } from "react-helmet";
import "./Projects.css";
import Nav from "../Components/Nav";
import TopBar from "../Components/TopBar";
import ProjectHolder from "../Components/ProjectHolder";
import Home from '../assets/Pages Pics/Home Page.png';
import UX from '../assets/Pages Pics/UX.png';
import modeling from '../assets/Pages Pics/3D.png';
import front from '../assets/Pages Pics/Front.png';
import photo from '../assets/Pages Pics/Photo.png';
import AR from '../assets/Pages Pics/AR.png';
import Contact from '../assets/Pages Pics/Contact.png';
import About from '../assets/Pages Pics/About.png';
const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects-HeshamAbozaid-490469420</title>
        <meta name="description" content="This is the Projects Page" />
        <meta property="og:title" content="Projects" />
      </Helmet>

      <Nav />
      <div className="DashboardContainer">
        <TopBar />

        <section className="Content">
          <section className="Projects">
            <ProjectHolder
              Mockup={Home}
              ProjectTitle="Home Page"
            />

            <ProjectHolder
              Mockup={UX}
              ProjectTitle="UX/UI Page"
            />
            <ProjectHolder
              Mockup={modeling}
              ProjectTitle="3D Modeling Page"
            />
            <ProjectHolder
              Mockup={front}
              ProjectTitle="Front-End Dev. Page"
            />
            <ProjectHolder
              Mockup={photo}
              ProjectTitle="Photography Page"
            />

            <ProjectHolder
              Mockup={AR}
              ProjectTitle="Augmented Reality Page"
            />

            <ProjectHolder
              Mockup={Contact}
              ProjectTitle="Contact Page"
            />

            <ProjectHolder
              Mockup={About}
              ProjectTitle="About Page"
            />
          </section>
        </section>
      </div>
    </>
  );
};

export default Projects;
