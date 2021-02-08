import React, { useState, useEffect } from "react";
import Button from "../Button";
import "./LoginForm.scss";
const LoginForm = ({ setShowModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (ev) => {
    ev.preventDefault();
    return false;
  };
  const onClickSignIn = () => {};
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="loginContainer">
      <i className="closeButton fas fa-times" onClick={() => setShowModal(false)}></i>
      <form className="loginForm" onSubmit={onSubmit}>
        <input
          className="inputText username"
          placeholder="Username"
          inputMode="text"
          type="text"></input>
        <div className="passwordContainer">
          <input
            className="inputText"
            placeholder="Password"
            type={`${showPassword ? "text" : "password"}`}></input>
          <i
            className={`showPassword fas ${!showPassword ? "fa-eye" : "fa-eye-slash"}`}
            id="showPassword"
            onClick={togglePassword}></i>
        </div>
        <Button className="login-button">Login</Button>
        <hr className="horizontal-divider" />
      </form>
      <button className="goToSignIn" onClick={onClickSignIn}>
        Already have an account? Sign in.
      </button>
      <div className="termsAndConditions">
        By signing in, you agree to the Terms and Conditions of Code-It
      </div>
    </div>
  );
};

export default LoginForm;
