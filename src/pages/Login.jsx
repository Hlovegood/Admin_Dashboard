import React from 'react';
import './Login.css';
import User from '../assets/Icons/User Icon.png';
import {Link} from 'react-router-dom';
import DotGrid from '../Components/DotGrid';
const login = () => {

    


    return ( <>
      <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#ffb70044"
            activeColor="#ff0000ff"
            proximity={80}
            shockRadius={150}
            shockStrength={5}
            resistance={250}
            returnDuration={3.5}
          />
        </div>
    <section className='LoginSec'>
        <article className='LoginHeader'>
            <img src={User} alt="User Icon" />

            <p>
                Login
            </p>
        </article>

        <article className='MailField'>
            <h3>
                E-mail
            </h3>

            <input type="e-mail" placeholder='Enter E-mail here' className='MailInput'/>
        </article>

        <article className='PassField'>
            <h3>
                Password
            </h3>

            <input type="password" placeholder='Enter Password here' className='PassInput' />

            <article className='forgot'>
            <Link>
                <p>
                    Forgot Password?
                </p>
            </Link>

            </article>
        </article>

        <button className='SigninButton'>
            Sign In
        </button>

        <article className='RememberButton'>

        <input type="checkbox" />

        <p>
            Remember Me
        </p>

        </article>


    </section>

        </div>
        


    </> );
}
 
export default login;