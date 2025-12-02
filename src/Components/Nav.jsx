import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  NavLink  from '../common/NavLink';
import './Nav.css'
import DashIcon from '../assets/Icons/Dashboard Icon.svg';
import ProjectsIcon from '../assets/Icons/Projects Icon.svg';
import UsersIcon from '../assets/Icons/Users Icon.svg';
import ProfileIcon from '../assets/Icons/Profile Icon.svg';
const Nav = () => {
    return ( <>
    <nav>
        <ul>
            <li>
                <Link>
                <NavLink Icon={DashIcon} Text={"Dashboard"}/>
                </Link>
            </li>
            
            <li>
                <Link>
                <NavLink Icon={ProjectsIcon} Text={"Projects"}/>
                </Link>
            </li>

            <li>
                <Link>
                <NavLink Icon={UsersIcon} Text={"Users"}/>
                </Link>
            </li>


            <li>
                <Link>
                <NavLink Icon={ProfileIcon} Text={"Profile"}/>
                </Link>
            </li>
        </ul>
    </nav>
    
    
    </> );
}
 
export default Nav;