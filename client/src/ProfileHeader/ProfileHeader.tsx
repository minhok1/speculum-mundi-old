import "./ProfileHeader.css";
import { authSlice } from "../store/slices/auth";
import ProfileWidget from "./ProfileWidget";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileHeader(props: any) {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isRegistrationActive, setIsRegistrationActive] = useState(false);
  const currState = useSelector((state: any) => state);

  const dispatch = useDispatch();

  const handleLogin = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", e.target[0].value);
    formData.append("password", e.target[1].value);

    axios
      .post(`http://localhost:8000/api/auth/login/`, formData)
      .then((res) => {
        dispatch(authSlice.actions.setAccount(res.data.user));
        dispatch(
          authSlice.actions.setAuthTokens({
            token: res.data.access,
            refreshToken: res.data.refresh,
          })
        );
        setIsLoginActive(false);
      })
      .catch((err) => {
        console.log("not found");
      });
  };

  const handleRegistration = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", e.target[0].value);
    formData.append("password", e.target[1].value);
    formData.append("email", e.target[2].value);
    axios
      .post(`http://localhost:8000/api/auth/register/`, formData)
      .then(() => {
        setIsRegistrationActive(false);
      });
  };

  return (
    <div className="header-container">
      {/* <button onClick={testf}>test</button> */}
      <div className="header-title">
        <DragHandleIcon />
        <span className="header-text">{props.pageTitle}</span>
      </div>
      {currState.auth.token && currState.auth.account ? (
        <ProfileWidget auth={currState} dispatch={dispatch} />
      ) : (
        <div className="auth-container">
          <button
            className={"auth-button" + (isLoginActive ? " login-active" : "")}
            onClick={() => {
              setIsLoginActive(!isLoginActive);
              setIsRegistrationActive(false);
            }}
          >
            Sign In
          </button>
          {isLoginActive && (
            <div className="login-container">
              <div className="auth-header">Please sign in</div>
              <form className="auth-form" onSubmit={handleLogin}>
                <input
                  className="auth-input login-username"
                  placeholder="Username"
                />
                <input
                  className="auth-input login-password"
                  placeholder="Password"
                />
                <button type="submit" className="auth-confirm">
                  Log In
                </button>
              </form>
            </div>
          )}
          <button
            className={
              "auth-button" + (isRegistrationActive ? " login-active" : "")
            }
            onClick={() => {
              setIsRegistrationActive(!isRegistrationActive);
              setIsLoginActive(false);
            }}
          >
            Sign Up
          </button>
          {isRegistrationActive && (
            <div className="login-container">
              <div className="auth-header">Please sign up</div>
              <form className="auth-form" onSubmit={handleRegistration}>
                <input
                  className="auth-input login-username"
                  placeholder="Username"
                />
                <input
                  className="auth-input login-password"
                  placeholder="Password"
                />
                <input className="auth-input login-email" placeholder="Email" />
                <button type="submit" className="auth-confirm">
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
