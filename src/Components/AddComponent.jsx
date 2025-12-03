import React from "react";
import Plus from "../assets/Icons/Plus Icon.svg";
import "./AddComponent.css";
import { Link } from 'react-router-dom';

const AddComponent = (props) => {
  return (
    <>
      <Link className="Container1">
        <section >
          <div className="PlusSignCont">
            <img src={Plus} alt="" className="PlusSign" />
          </div>

          <article>
            <div className="ProjectData1">
              <h3 className="Title1">{props.Function}</h3>
            </div>
          </article>
        </section>
      </Link>
    </>
  );
};

export default AddComponent;
