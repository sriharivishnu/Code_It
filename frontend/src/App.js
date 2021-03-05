import "./App.scss";
import NavBar from "./component/NavBar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Community from "./pages/Community";
import Contribute from "./pages/Contribute";

import ModalDialog from "./component/ModalDialog";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthModal from "./parts/AuthModal/AuthModal";
const App = () => {
  const [dialogState, setDialogState] = useState({
    showDialog: false,
    content: null,
    closable: true,
  });
  const [padded, setPadded] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDialogState = (state, content = null, closable = true) => {
    setDialogState({ showDialog: state, content: content, closable: closable });
  };
  const onClickAuth = (signUp) => {
    return () => {
      onDialogState(
        true,
        <AuthModal setShowModal={onDialogState} signUpFlag={signUp} setLoading={setLoading} />
      );
    };
  };

  const setPadding = (bool) => {
    setPadded(bool);
  };

  return (
    <Router>
      <div className="App">
        <NavBar
          onClickLogin={onClickAuth(false)}
          onClickSignUp={onClickAuth(true)}
          padded={padded}
        />
        <ModalDialog
          showModal={dialogState.showDialog}
          setShowModal={onDialogState}
          Content={dialogState.content}
          closable={dialogState.closable}
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
            <Route path="/contribute">
              <Contribute setPadding={setPadding} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
