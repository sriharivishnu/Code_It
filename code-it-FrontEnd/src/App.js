import "./App.scss";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Community from "./pages/Community";

import ModalDialog from "./component/ModalDialog";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  const [showDialog, setShowDialog] = useState(false);
  const onClickSignUp = () => {
    setShowDialog(!showDialog);
  };
  const onClickLogin = () => {
    setShowDialog(!showDialog);
  };
  return (
    <Router>
      <div className="App">
        <NavBar onClickLogin={onClickLogin} onClickSignUp={onClickSignUp} />
        <ModalDialog showModal={showDialog} setShowModal={setShowDialog} />
        <div className="main">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/community" component={Community} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
