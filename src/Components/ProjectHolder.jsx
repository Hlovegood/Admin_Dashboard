import React from "react";
import './ProjectHolder.css';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const ProjectHolder = (props) => {
  async function deleteProject(id) {
    const res = await supabase.from("Project Details").delete().eq("id", id);
  }

  return (
    <>
      <section className="Container">
        <img src={props.Mockup} alt="" className="Mockup" />

        <article>
          <div className="ProjectData">
            <h3 className="Title">
              {props.ProjectTitle}
            </h3>

            <h6 className="Year">
              {props.Year}
            </h6>
          </div>
          <article className="Buttons">
            <Link to={`/edit-project/${props.id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => deleteProject(props.id)}>Delete</button>
          </article>
        </article>
      </section>
    </>
  );
};

export default ProjectHolder;