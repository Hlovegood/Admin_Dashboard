import React from "react";
import './ProjectHolder.css';

const ProjectHolder = (props) => {
  return (
    <>
      <section className="Container">
          <img src={props.Mockup} alt="" className="Mockup" />
        

        <article >
            <div className="ProjectData">
            <h3 className="Title">
                {props.ProjectTitle}
            </h3>

            <h6 className="Year">
                {props.Year}
            </h6>
            </div>
        </article>

        <article className="Buttons">
            <button>
                Edit
            </button>

            <button>
                Delete
            </button>
        </article>
      </section>
    </>
  );
};

export default ProjectHolder;
