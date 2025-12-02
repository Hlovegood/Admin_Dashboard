import React from 'react';

const NavLink = (props) => {
    return ( <>
        <article>
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