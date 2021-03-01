import React, { useState } from "react";
import InputField from "../../../component/InputField";
import Button from "../../../component/Button";
import "./SignUpForm.scss";
const SignUpForm = ({ setShowModal, goToSignIn, signUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    signUp(username, password, email);
    return false;
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onChangeUsername = (evt) => setUsername(evt.target.value);
  const onChangePassword = (evt) => setPassword(evt.target.value);
  const onChangeEmail = (evt) => setEmail(evt.target.value);
  return (
    <div className="signUpContainer">
      <i className="closeButton fas fa-times" onClick={() => setShowModal(false)}></i>
      <h1 className="sign-up-logo">Code-It</h1>
      <form className="signUpForm" onSubmit={onSubmit}>
        <InputField
          className="username"
          placeholder="Username"
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
            onClick={togglePassword}
          />
        </div>
        <InputField
          className="email"
          placeholder="Email"
          inputMode="email"
          type="text"
          onChange={onChangeEmail}
        />
        <Button className="sign-up-button">Sign Up</Button>
        <hr className="horizontal-divider" />
      </form>
      <button className="goToSignIn" onClick={goToSignIn}>
        Have an account? Sign in.
      </button>
      <div className="termsAndConditions">
        By signing up, you agree to the Terms and Conditions of Code-It
      </div>
    </div>
  );
};

export default SignUpForm;
