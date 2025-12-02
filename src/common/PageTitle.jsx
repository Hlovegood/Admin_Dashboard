import React from 'react';
import './PageTitle.css'
const PageTitle = (props) => {
    return ( <>
    <h1 className='Title'>
        {props.Title}
    </h1>

    <h2 className='SubTitle'>
        {props.SubTitle}
    </h2>
    </> );
}
 
export default PageTitle;