import React from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import TaskList from "../tasks/TaskList";
import {
  deleteProject,
  getProjectList,
} from "../../../services/ProjectService";

class ProjectList extends React.Component {
  state = {
    projectList: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getProjectLists();
  }

  getProjectLists = async () => {
    this.setState({ isLoading: true });
    const response = await getProjectList();
    if (response.success) {
      this.setState({
        projectList: response.data,
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  deleteProject = async (id) => {
    const response = await deleteProject(id);
    if (response.success) {
      this.getProjectLists();
    } else {
      alert("Sorry !! Something went wrong !!");
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            <h2>
              Project List{" "}
              <Badge variant="primary">{this.state.projectList.length}</Badge>
            </h2>
          </div>
          <div className="float-right">
            <Link to={`${PUBLIC_URL}projects/create`} className="btn btn-info">
              + Create New
            </Link>
          </div>
          <div className="clearfix"></div>
        </div>
        {this.state.isLoading && (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {this.state.projectList.map((project, index) => (
          <Card key={index} className="mt-3">
            <Card.Header>
              {project.name}{" "}
              <Badge variant="primary">{project.tasks_count}</Badge>
            </Card.Header>
            <Card.Body>
              <Card.Text>{project.description}</Card.Text>
              {/* <TaskList taskList={project.tasks} isDetailsView={false} /> */}
              <Link
                to={`${PUBLIC_URL}projects/view/${project.id}`}
                className="btn btn-primary mr-2"
              >
                View & Edit
              </Link>
              <Button
                variant="danger"
                className="mr-2"
                onClick={() => this.deleteProject(project.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default ProjectList;
