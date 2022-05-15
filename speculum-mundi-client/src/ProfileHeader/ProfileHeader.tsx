import "./ProfileHeader.css";

import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useState } from "react";

export default function ProfileHeader(props: any) {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isRegistrationActive, setIsRegistrationActive] = useState(false);

  return (
    <div className="header-container">
      <div className="header-title">
        <DragHandleIcon />
        <span className="header-text">{props.pageTitle}</span>
      </div>
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
            <div className="login-header">Please sign in</div>
            <form className="login-form">
              <input
                className="login-input login-username"
                placeholder="Username"
              />
              <input
                className="login-input login-password"
                placeholder="Password"
              />
              <button className="login-confirm">Log In</button>
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
            <div className="login-header">Please sign in</div>
            <form className="login-form">
              <input
                className="login-input login-username"
                placeholder="Username"
              />
              <input
                className="login-input login-password"
                placeholder="Password"
              />
              <input className="login-input login-email" placeholder="Email" />
              <button className="login-confirm">Register</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
