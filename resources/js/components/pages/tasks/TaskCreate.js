import React from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import { storeNewProject } from "../../../services/ProjectService";
import { storeNewTask } from "../../../services/TaskService";

class TaskCreate extends React.Component {
  state = {
    isLoading: false,
    name: "",
    description: "",
    errors: {},
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;

    this.setState({ isLoading: true });
    const postBody = {
      name: this.state.name,
      description: this.state.description,
      project_id: this.props.project_id,
    };
    const response = await storeNewTask(postBody);
    if (response.success) {
      console.log("response.data", response.data);
      this.setState({
        name: "",
        description: "",
        isLoading: false,
      });
      this.props.onCompleteTaskCreate(response.data);
    } else {
      this.setState({
        errors: response.errors,
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <h2>New Task</h2>
            <Form onSubmit={this.submitForm}>
              <div className="row">
                <div className="col-6">
                  <Form.Group controlId="name">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Task Title"
                      value={this.state.name}
                      name="name"
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.name && (
                    <p className="text-danger">{this.state.errors.name[0]}</p>
                  )}
                </div>
                <div className="col-6">
                  <Form.Group controlId="description">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Task Description"
                      as="textarea"
                      rows="3"
                      name="description"
                      value={this.state.description}
                      onChange={(e) => this.changeInput(e)}
                    />
                  </Form.Group>
                  {this.state.errors && this.state.errors.description && (
                    <p className="text-danger">
                      {this.state.errors.description[0]}
                    </p>
                  )}
                </div>
              </div>

              {this.state.isLoading && (
                <Button variant="primary" type="button" disabled>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>{" "}
                  Saving...
                </Button>
              )}

              {!this.state.isLoading && (
                <Button variant="primary" type="submit">
                  Save Task
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(TaskCreate);
