import React from "react";
import { Container } from "react-bootstrap";
import ProjectList from "./projects/ProjectList";

function Home() {
  return (
    <Container>
      {/* <h2>Home Page</h2> */}
      <ProjectList />
    </Container>
  );
}
export default Home;
