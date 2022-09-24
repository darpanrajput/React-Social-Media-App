import React, { useContext } from "react";
import { loginCall } from "../../apiCalls/ApiCalls";
import "./login.css";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(e.appVersion);
    // console.log(email.current.value);
    // console.log(password);

    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user);
  console.log("isfetching=" + isFetching);
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
              placeholder="Email"
              type="email"
              className="logininput"
              required
              ref={email}
            />
            <input
              placeholder="Pasword"
              type="password"
              className="logininput"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginBtn" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="primary" size="25px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginforgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="primary" size="25px" />
              ) : (
                <Link
                  to={"/Register"}
                  style={{ color: "inherit", textDecoration: "inherit" }}>
                  Create A New Account
                </Link>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
