import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";

function Home() {
  return (
    <Container>
      <div className="card card-body">
        <h2>Welcome to Home Page</h2>
        <p>
          Login to your account and enjoy storing and assigning your projects...
        </p>
        <p>
          <Link to={`${PUBLIC_URL}login`} className="btn btn-primary">
            Sign In Now
          </Link>
        </p>

        <p>
          If there is no account, Please Register: <br />
          <Link to={`${PUBLIC_URL}register`} className="btn btn-success">
            Sign Up
          </Link>
        </p>
      </div>
    </Container>
  );
}
export default Home;
