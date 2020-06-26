import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Container } from "react-bootstrap";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectList from "./pages/projects/ProjectList";
import ProjectCreate from "./pages/projects/ProjectCreate";
import ProjectView from "./pages/projects/ProjectView";
import { PUBLIC_URL } from "../constants";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <div>
            <Container className="p-4">
              <Switch>
                <Route
                  path={`${PUBLIC_URL}about`}
                  exact={true}
                  component={About}
                />
                <Route
                  path={`${PUBLIC_URL}contact`}
                  exact={true}
                  component={Contact}
                />
                <Route
                  path={`${PUBLIC_URL}projects/view/:id`}
                  exact={true}
                  component={ProjectView}
                />
                <Route
                  path={`${PUBLIC_URL}projects/create`}
                  exact={true}
                  component={ProjectCreate}
                />

                <Route
                  path={`${PUBLIC_URL}projects`}
                  exact={true}
                  component={ProjectList}
                />
                <Route path={`${PUBLIC_URL}`} exact={true} component={Home} />
              </Switch>

              <Footer />
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
