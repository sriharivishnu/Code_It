import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import React, { useState } from "react";
const AuthModal = ({ setShowModal, setLoading, signUp = true }) => {
  const [current, setCurrent] = useState(signUp);
  const goToSignUp = () => setCurrent(true);
  const goToSignIn = () => setCurrent(false);

  const signInUser = (username_or_email, password) => {
    setLoading(true);
    // console.log("Log In: ", username_or_email, password);
  };
  const signUpUser = (username, password, email) => {
    setLoading(true);
    // console.log("Sign Up: ", username, password, email);
  };
  if (current)
    return <SignUpForm setShowModal={setShowModal} goToSignIn={goToSignIn} signUp={signUpUser} />;
  else return <LoginForm setShowModal={setShowModal} goToSignUp={goToSignUp} signIn={signInUser} />;
};

export default AuthModal;
