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
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { checkIfAuthenticated } from "../services/AuthService";
import AuthenticatedRoutes from "./AuthenticatedRoutes";

class App extends Component {
  state = {
    user: {},
    isLoggedIn: false,
  };
  componentDidMount() {
    if (checkIfAuthenticated()) {
      this.setState({
        user: checkIfAuthenticated(),
        isLoggedIn: true,
      });
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Header authData={this.state} />
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

                {/* Private Authenticated Routes */}
                <AuthenticatedRoutes
                  authed={this.state.isLoggedIn}
                  path={`${PUBLIC_URL}projects/view/:id`}
                  component={ProjectView}
                />

                <AuthenticatedRoutes
                  authed={this.state.isLoggedIn}
                  path={`${PUBLIC_URL}projects/create`}
                  component={ProjectCreate}
                />

                <AuthenticatedRoutes
                  authed={this.state.isLoggedIn}
                  path={`${PUBLIC_URL}projects`}
                  component={ProjectList}
                />

                {/* Private Authenticated Routes */}

                <Route
                  path={`${PUBLIC_URL}register`}
                  exact={true}
                  component={Register}
                />

                <Route
                  path={`${PUBLIC_URL}login`}
                  exact={true}
                  component={Login}
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
