import React from 'react';
import './Login.css';
import User from '../assets/Icons/User Icon.png';
import {Link} from 'react-router-dom'
const login = () => {
    return ( <>
    <section>
        <article>
            <img src={User} alt="User Icon" />

            <p>
                Login
            </p>
        </article>

        <article>
            <h2>
                E-mail
            </h2>

            <input type="e-mail" placeholder='Enter E-mail here' />
        </article>

        <article>
            <h2>
                Password
            </h2>

            <input type="password" placeholder='Enter Password here' />

            
            <Link>
                <p>
                    Forgot Password?
                </p>
            </Link>
        </article>

        <button>
            Sign In
        </button>

        
    </section>
    </> );
}
 
export default login;