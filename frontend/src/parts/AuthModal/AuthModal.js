import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import React, { useState } from "react";
import { signUpUser, signInUser } from "./AuthLogic";
const AuthModal = ({ setShowModal, setLoading, signUpFlag = true }) => {
  const [current, setCurrent] = useState(signUpFlag);
  const goToSignUp = () => setCurrent(true);
  const goToSignIn = () => setCurrent(false);

  const signUp = (username, password, email) => {
    setLoading(true);
    signUpUser(username, password, email);
  };
  const signIn = (username_or_email, password) => {
    setLoading(true);
    signInUser(username_or_email, password);
  };
  if (current)
    return <SignUpForm setShowModal={setShowModal} goToSignIn={goToSignIn} signUpUser={signUp} />;
  else return <LoginForm setShowModal={setShowModal} goToSignUp={goToSignUp} signInUser={signIn} />;
};

export default AuthModal;
