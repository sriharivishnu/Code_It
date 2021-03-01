import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import React, { useState } from "react";
import { signUpUser, signInUser } from "./AuthLogic";
const AuthModal = ({ setShowModal, setLoading, signUpFlag = true }) => {
  const [current, setCurrent] = useState(signUpFlag);
  const goToSignUp = () => setCurrent(true);
  const goToSignIn = () => setCurrent(false);

  const signIn = (username_or_email, password) => {
    setLoading(true);
    signInUser(username_or_email, password);
  };
  const signUp = (username, password, email) => {
    setLoading(true);
    signUpUser(username, password, email);
  };
  if (current)
    return <SignUpForm setShowModal={setShowModal} goToSignIn={goToSignIn} signUp={signUp} />;
  else return <LoginForm setShowModal={setShowModal} goToSignUp={goToSignUp} signIn={signIn} />;
};

export default AuthModal;
