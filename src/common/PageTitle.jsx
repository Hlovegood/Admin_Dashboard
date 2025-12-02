import React from 'react';

const PageTitle = (props) => {
    return ( <>
    <h1>
        {props.Title}
    </h1>

    <h2>
        {props.SubTitle}
    </h2>
    </> );
}
 
export default PageTitle;