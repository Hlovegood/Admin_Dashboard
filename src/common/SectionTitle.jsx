import React from 'react';

const SectionTitle = (props) => {
    return ( <>
        <h3 className='Title'>
        {props.SecTitle}
    </h3>

    <h5 className='SubTitle'>
        {props.SecSubTitle}
    </h5>
    
    </> );
}
 
export default SectionTitle;