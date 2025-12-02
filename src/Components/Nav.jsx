import React, { Component } from 'react';
import  NavLink  from '../common/NavLink';
import './Nav.css'
import DashIcon from '../assets/Icons/Dashboard Icon.svg';
const Nav = () => {
    return ( <>
    <nav>
        <ul>
            <li>
                <NavLink Icon={DashIcon} Text={"Dashboard"}/>
            </li>
            
        </ul>
    </nav>
    
    
    </> );
}
 
export default Nav;