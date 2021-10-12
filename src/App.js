import "./styles/App.css";
import "./styles/nav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Container from "react-bootstrap/Container";
import React from "react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Phones from "./pages/Phones";
import Map from "./pages/Map";
import Account from "./pages/Account";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Container>
              <Home />
            </Container>
          </Route>
          <Route path="/signup">
            <Container>
              <Signup />
            </Container>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/phones">
            <Phones />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
