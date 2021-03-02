import React, { useState } from "react";
import Button from "../../../component/Button";
import InputField from "../../../component/InputField";
import "./LoginForm.scss";
const LoginForm = ({ setShowModal, goToSignUp, signInUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username_email, setUsername_Email] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    signInUser(username_email, password);
    return false;
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onChangeUsername = (evt) => setUsername_Email(evt.target.value);
  const onChangePassword = (evt) => setPassword(evt.target.value);
  return (
    <div className="loginContainer">
      <i className="closeButton fas fa-times" onClick={() => setShowModal(false)}></i>
      <h1 className="login-logo">Code-It</h1>
      <form className="loginForm" onSubmit={onSubmit}>
        <InputField
          className="username"
          placeholder="Username or Email"
          inputMode="text"
          type="text"
          onChange={onChangeUsername}
        />
        <div className="passwordContainer">
          <InputField
            className="password"
            placeholder="Password"
            type={`${showPassword ? "text" : "password"}`}
            onChange={onChangePassword}
          />
          <i
            className={`showPassword fas ${!showPassword ? "fa-eye" : "fa-eye-slash"}`}
            id="showPassword"
            onClick={togglePassword}></i>
        </div>
        <Button className="login-button">Login</Button>
        <hr className="horizontal-divider" />
      </form>
      <button className="goToSignIn" onClick={goToSignUp}>
        Don't have an account? Sign up.
      </button>
      <div className="termsAndConditions">
        By signing in, you agree to the Terms and Conditions of Code-It
      </div>
    </div>
  );
};

export default LoginForm;
