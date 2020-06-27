import React from "react";
import {
  Card,
  Button,
  Badge,
  Spinner,
  Form,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
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
    searchProjectList: [],
    isLoading: false,
    searchText: "",
  };

  componentDidMount() {
    this.getProjectLists();
    console.log("this.props", this.props);
  }

  getProjectLists = async () => {
    this.setState({ isLoading: true });
    const response = await getProjectList();
    if (response.success) {
      this.setState({
        projectList: response.data,
        searchProjectList: response.data,
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

  onSearchProjects = (e) => {
    const searchText = e.target.value;
    this.setState({
      isLoading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.projectList.filter(function (item) {
        const itemData = item.name + " " + item.description;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;
      });
      this.setState({
        searchProjectList: searchData,
        searchText: searchText,
        isLoading: false,
      });
    } else {
      this.setState({
        searchText,
      });
      this.getProjectLists();
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            <h2>
              Project List{" "}
              <Badge variant="primary">
                {this.state.searchProjectList.length}
              </Badge>
            </h2>
          </div>
          <div className="float-left text-center ml-5">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type Projects to Search..."
                aria-label="Type Projects to Search..."
                aria-describedby="basic-addon2"
                onChange={(e) => this.onSearchProjects(e)}
              />
            </InputGroup>
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

        {this.state.searchProjectList.length === 0 && (
          <Alert variant={"warning"}>
            No Projects Found !! Please create one...
          </Alert>
        )}

        {this.state.searchProjectList.map((project, index) => (
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
