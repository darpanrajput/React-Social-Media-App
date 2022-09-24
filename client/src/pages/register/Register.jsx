import { React } from "react";

import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const username = useRef();

  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      password.current.setCustomValidity("Password Don't Match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        // const res = await axios.post("/auth/register", user);
        await axios.post("/auth/register", user);

        console.log("login");
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginwrapper">
        <div className="loginleft">
          <h3 className="loginlogo">Fakebook</h3>
          <span className="logindesc">
            Connect with friends and the world arround you on fakebook
          </span>
        </div>
        <div className="loginright">
          <form className="loginbox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              className="logininput"
              required
            />

            <input
              placeholder="Email"
              ref={email}
              type="email"
              className="logininput"
              required
            />
            <input
              placeholder="Pasword"
              type="password"
              ref={password}
              minLength="6"
              className="logininput"
              required
            />

            <input
              placeholder="Password Again"
              type="password"
              ref={passwordAgain}
              minLength="6"
              className="logininput"
              required
            />

            <button className="loginBtn">Sign Up</button>

            <button className="loginRegisterButton">
              <Link
                to={"/Login"}
                style={{ color: "inherit", textDecoration: "inherit" }}>
                Log into your Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
