import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import  NavLink  from '../common/NavLink';
import DashIcon from '../assets/Icons/Dashboard Icon.svg';
import ProjectsIcon from '../assets/Icons/Projects Icon.svg';
import ProfileIcon from '../assets/Icons/Profile Icon.svg';
import LogoutIcon from '../assets/Icons/Logout Icon.svg';
import PaperIcon from '../assets/Icons/Paper Icon.svg'
const Nav = () => {
    return ( <>
    <nav>

        <article className='UserDiv'>
            <div>
                <img src={ProfileIcon} alt="Profile Icon" />
            </div>

            <p>
                Hesham Abozaid
            </p>
        </article>

        <ul>
            <li>
                <Link to = "/dashboard">
                <NavLink Icon={DashIcon} Text={"Dashboard"}/>
                </Link>
            </li>
            
            <li>
                <Link to = "/projects">
                <NavLink Icon={ProjectsIcon} Text={"Projects"}/>
                </Link>
            </li>

            <li>
                <Link to={'/profile'}>
                <NavLink Icon={ProfileIcon} Text={"Profile"}/>
                </Link>
            </li>

                <li>
                <Link to={"/pages"}>
                <NavLink Icon={PaperIcon} Text={"Pages"}/>
                </Link>
            </li>
        </ul>


        <article className='Logout'>

        <Link to ="/">
            <NavLink Icon={LogoutIcon} Text={"Logout"}/>
        </Link>
        </article>
    </nav>
    
    
    </> );
}
 
export default Nav;