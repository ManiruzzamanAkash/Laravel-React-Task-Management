import React from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import { registerUser } from "../../../services/AuthService";

class Register extends React.Component {
  state = {
    isLoading: false,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: {},

    validated: false,
  };

  componentDidMount() {}

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({
      validated: true,
    });

    const { history } = this.props;

    const postBody = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };
    if (form.checkValidity() !== false) {
      event.preventDefault();
      this.setState({ isLoading: true });
      const response = await registerUser(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
          isLoading: false,
          errors: {},
        });
        localStorage.setItem("loginData", JSON.stringify(response));
        // history.push(`${PUBLIC_URL}projects`);
      } else {
        console.log("response.errors", response.errors);
        this.setState({
          errors: response.errors,
          isLoading: false,
        });
        localStorage.setItem("loginData", null);
      }
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            <h2>Sign Up</h2>
          </div>
          <div className="clearfix"></div>
        </div>

        <Card>
          <Card.Body>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.submitForm}
            >
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Your Name"
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.changeInput(e)}
                    />
                    {this.state.errors && this.state.errors.name && (
                      <p className="text-danger">{this.state.errors.name[0]}</p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please give your name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Email Address"
                      value={this.state.email}
                      name="email"
                      onChange={(e) => this.changeInput(e)}
                    />
                    {this.state.errors && this.state.errors.email && (
                      <p className="text-danger">
                        {this.state.errors.email[0]}
                      </p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please give your valid email address
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Enter Password"
                      value={this.state.password}
                      name="password"
                      onChange={(e) => this.changeInput(e)}
                      minLength={8}
                    />
                    {this.state.errors && this.state.errors.password && (
                      <p className="text-danger">
                        {this.state.errors.password[0]}
                      </p>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please give password
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group controlId="password_confirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Enter Password"
                      value={this.state.password_confirmation}
                      name="password_confirmation"
                      onChange={(e) => this.changeInput(e)}
                      minLength={8}
                    />
                    {this.state.errors &&
                      this.state.errors.password_confirmation && (
                        <p className="text-danger">
                          {this.state.errors.password_confirmation[0]}
                        </p>
                      )}
                    <Form.Control.Feedback type="invalid">
                      Please give confirm password
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              {this.state.isLoading && (
                <Button variant="success" type="button" disabled>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>{" "}
                  Signing Up...
                </Button>
              )}

              {!this.state.isLoading && (
                <Button variant="success" type="submit">
                  Sign Up
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(Register);
