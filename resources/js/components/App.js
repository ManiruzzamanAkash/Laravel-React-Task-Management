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

class App extends Component {
  state = {
    PUBLIC_URL: "/myTask/",
  };

  render() {
    return (
      <div>
        <Router>
          <Header />
          <div>
            <Container className="p-4">
              <Switch>
                <Route path={`${this.state.PUBLIC_URL}about`}>
                  <About />
                </Route>
                <Route path={`${this.state.PUBLIC_URL}contact`}>
                  <Contact />
                </Route>
                <Route path={`${this.state.PUBLIC_URL}projects`}>
                  <ProjectList />
                </Route>
                <Route path={`${this.state.PUBLIC_URL}`}>
                  <Home />
                </Route>
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
