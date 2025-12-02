import React from 'react';
import './NavLink.css'
const NavLink = (props) => {
    return ( <>
        <article className='NavLink'>
            <div>
                <img src={props.Icon} alt="" />
            </div>

            <p>
                {props.Text}
            </p>
        </article>
    </> );
}
 
export default NavLink;