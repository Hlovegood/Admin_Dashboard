import React from "react";
import { Helmet } from "react-helmet";
import "./Projects.css";
import Nav from "../Components/Nav";
import TopBar from "../Components/TopBar";
import ProjectHolder from "../Components/ProjectHolder";
import Edita from "../assets/Mockups/Edita Website.png";
import TV from "../assets/Mockups/Nickelodeon Website.png";
import Car from "../assets/Mockups/Car Parts Website.png";
import Real from "../assets/Mockups/Real Estate Firm Website.png";
import Clothing from "../assets/Mockups/Clothing Shop App.png";
import Smoochy from "../assets/Mockups/E-Commerce Website.png";
import Food from "../assets/Mockups/Food App.png";
import Fire from "../assets/Mockups/Story Website.png";
import Rabbit from "../assets/Mockups/Plushie Store App.png";
import AddComponent from "../Components/AddComponent";
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
              Mockup={Edita}
              ProjectTitle="Egyptian Food Brand Website"
              Year="2024"
            />

            <ProjectHolder
              Mockup={TV}
              ProjectTitle="TV Channel Website"
              Year="2024"
            />
            <ProjectHolder
              Mockup={Car}
              ProjectTitle="Car Parts Website"
              Year="2024"
            />
            <ProjectHolder
              Mockup={Real}
              ProjectTitle="Real Estate Firm Website"
              Year="2024"
            />
            <ProjectHolder
              Mockup={Clothing}
              ProjectTitle="Clothing Shop App"
              Year="2024"
            />
            <ProjectHolder
              Mockup={Food}
              ProjectTitle="What to Eat App"
              Year="2024"
            />

            <ProjectHolder
              Mockup={Smoochy}
              ProjectTitle="E-Commerce Website"
              Year="2024"
            />

            <ProjectHolder
              Mockup={Fire}
              ProjectTitle="Fire Force Website"
              Year="2024"
            />

            <ProjectHolder
              Mockup={Rabbit}
              ProjectTitle="Plushie Store App"
              Year="2024"
            />

            <AddComponent Function="New Project"/>
          </section>
        </section>
      </div>
    </>
  );
};

export default Projects;
