import React from "react";
import './SectionTitle.css'

const SectionTitle = (props) => {
  return (
    <>
      <div className="Cont">
        <h3 className="Title">{props.SecTitle}</h3>

        <h5 className="SubTitle">{props.SecSubTitle}</h5>
      </div>
    </>
  );
};

export default SectionTitle;
