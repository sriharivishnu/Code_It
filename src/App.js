import "./App.css";
import NavBar from "./component/NavBar/NavBar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Community from "./pages/Community";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/explore" component={Explore} />
          <Route path="/community" component={Community} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
