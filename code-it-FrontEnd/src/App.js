import "./App.css";
import NavBar from "./component/NavBar/";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Community from "./pages/Community";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
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
