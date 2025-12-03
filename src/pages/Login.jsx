import React, {useState} from "react";
import { Helmet } from "react-helmet";
import "./Login.css";
import User from "../assets/Icons/User Icon.png";
import { Link, useNavigate} from "react-router-dom";
import DotGrid from "../Components/DotGrid";
const Login = () => {
  
  <meta name="robots" content="noindex, nofollow"></meta>



    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        if (!email.trim() || !password.trim()) {
            alert('Please fill in both email and password fields');
            return;
        }
        
        navigate('/dashboard');
    };

  return (
    <>

          <Helmet>
        <title>Login-HeshamAbozaid-490469420</title>
        <meta
          name="description"
          content="This is the Login Page for the admin dashboard"
        />
        <meta property="og:title" content="Login" />
      </Helmet>
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
        <section className="LoginSec">
          <article className="LoginHeader">
            <img src={User} alt="User Icon" />

            <p>Login</p>
          </article>

          <article className="MailField">
            <h3>E-mail</h3>

            <input
              type="email"
              placeholder="Enter E-mail here"
              className="MailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </article>

          <article className="PassField">
            <h3>Password</h3>

            <input
              type="password"
              placeholder="Enter Password here"
              className="PassInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <article className="forgot">
              <Link>
                <p>Forgot Password?</p>
              </Link>
            </article>
          </article>

          <button onClick={handleSignIn} className="SigninButton">
            Sign In
          </button>

          <article className="RememberButton">
            <input type="checkbox" />

            <p>Remember Me</p>
          </article>
        </section>
      </div>
    </>
  );
};

export default Login;
