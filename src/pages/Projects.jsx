import React , { useEffect, useState } from "react";
import { supabase } from '../supabase';
import { Helmet } from "react-helmet";
import "./Projects.css";
import Nav from "../Components/Nav";
import TopBar from "../Components/TopBar";
import ProjectHolder from "../Components/ProjectHolder";
import AddComponent from "../Components/AddComponent";
const Projects = () => {



    const [loading, setLoading] = useState(true);
     const [Details, setDetails] = useState([
       {
Apps:"",
Category: "",
CoverImg: "",
Dev: "",
Images: "",
Img_1: "",
Img_2: "",
Img_3: "",
Impact: "",
Learnings: "",
Ovr: "",
Prob: "",
Proto: "",
Research: "",
Role: "",
Sol: "",
Time: "",
Title: "",
Year: "",
created_at: "",
id: ""
        }
     ])

      useEffect(()=>{
        
        async function  callGetAPI(){
          const Details = await supabase.from("Project Details").select("*");
          setDetails(Details.data)
          // console.log(Details.data[1]);
          setLoading(false);
          }
  
          callGetAPI();
  
      },[]);
        if (loading) return <p>Loading...</p>;

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

{
  Details.map((Detail)=>{
    return <ProjectHolder
              Mockup={Detail.CoverImg}
              ProjectTitle={Detail.Title}
              Year={Detail.Year}
              id={Detail.id}
            />

  }
  )
}

           

            <AddComponent Function="New Project" Page = "/project-editor"/>
          </section>
        </section>
      </div>
    </>
  );
};

export default Projects;
