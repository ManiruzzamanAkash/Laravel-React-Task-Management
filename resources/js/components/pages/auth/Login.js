import React from "react";
import { Card, Button, Badge, Spinner, Form, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { loginUser } from "../../../services/AuthService";

class Login extends React.Component {
  state = {
    isLoading: false,
    email: "",
    password: "",
    errors: {},
    errorMessage: "",
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
      email: this.state.email,
      password: this.state.password,
    };
    if (form.checkValidity() !== false) {
      event.preventDefault();
      this.setState({ isLoading: true });
      const response = await loginUser(postBody);
      console.log("response register", response);
      if (response.success) {
        this.setState({
          email: "",
          password: "",
          isLoading: false,
          errors: {},
          errorMessage: "",
        });
        localStorage.setItem("loginData", JSON.stringify(response));
        // history.replace(`${PUBLIC_URL}projects`);
        window.location.href = PUBLIC_URL;
      } else {
        console.log("response.errors", response.errors);
        this.setState({
          errors: response.errors,
          isLoading: false,
          errorMessage: response.message,
        });
        localStorage.setItem("loginData", null);
      }
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="text-center">
            <h2>Sign In</h2>
          </div>
          <div className="clearfix"></div>
        </div>

        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.submitForm}
        >
          <div className="row justify-content-center">
            <div className="col-8">
              <Card>
                <Card.Body>
                  {this.state.errorMessage.length > 0 && (
                    <Alert
                      variant="danger"
                      onClose={() => this.setState({ errorMessage: "" })}
                      dismissible
                    >
                      {this.state.errorMessage}
                    </Alert>
                  )}

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

                  {this.state.isLoading && (
                    <Button variant="success" type="button" disabled block>
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>{" "}
                      Signing In...
                    </Button>
                  )}

                  {!this.state.isLoading && (
                    <Button variant="success" type="submit" block>
                      Sign In
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </Form>
      </>
    );
  }
}

export default withRouter(Login);
