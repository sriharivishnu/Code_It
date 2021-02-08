import "./App.scss";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Community from "./pages/Community";

import ModalDialog from "./component/ModalDialog";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./component/LoginForm/LoginForm";
const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [padded, setPadded] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const onClickSignUp = () => {
    setShowDialog(!showDialog);
  };
  const onClickLogin = () => {
    setShowDialog(!showDialog);
  };

  const setPadding = (bool) => {
    setPadded(bool);
  };

  useEffect(() => {
    const onScroll = (e) => {
      setScrollPos(window.pageYOffset);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
  return (
    <Router>
      <div className="App">
        <NavBar
          onClickLogin={onClickLogin}
          onClickSignUp={onClickSignUp}
          transparent={padded ? false : scrollPos < 10}
        />
        <ModalDialog
          showModal={showDialog}
          setShowModal={setShowDialog}
          Content={<LoginForm setShowModal={setShowDialog} />}
        />
        <div className={`main ${padded ? "padded" : ""}`}>
          <Switch>
            <Route path="/" exact>
              <Home setPadding={setPadding} />
            </Route>
            <Route path="/explore">
              <Explore setPadding={setPadding} />
            </Route>
            <Route path="/community">
              <Community setPadding={setPadding} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
