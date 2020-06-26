import React from "react";
import {
  Card,
  Button,
  Badge,
  Spinner,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import TaskCreate from "../tasks/TaskCreate";
import TaskList from "../tasks/TaskList";
import ProjectEdit from "./ProjectEdit";

class ProjectView extends React.Component {
  state = {
    project: {},
    taskList: [],
    searchTaskList: [],
    isLoading: false,

    toggleAddTask: false,
    toggleEditProject: false,

    searchText: "",
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getProjectDetails();
  }

  getProjectDetails = () => {
    this.setState({ isLoading: true });
    Axios.get(
      `http://localhost:8200/myTask/api/projects/${this.props.match.params.id}`
    ).then((res) => {
      this.setState({
        taskList: res.data.data.tasks,
        searchTaskList: res.data.data.tasks,
        project: res.data.data,
        isLoading: false,
      });
    });
  };

  toggleAddTask = () => {
    this.setState({
      toggleEditProject: false,
      toggleAddTask: !this.state.toggleAddTask,
    });
  };

  toggleEditProject = () => {
    this.setState({
      toggleAddTask: false,
      toggleEditProject: !this.state.toggleEditProject,
    });
  };

  onCompleteTaskCreate = (task) => {
    this.toggleAddTask();
    let tasks = this.state.taskList;
    tasks.unshift(task);
    this.setState({
      taskList: tasks,
      searchTaskList: tasks,
    });
  };

  onCompleteProjectEdit = () => {
    this.getProjectDetails();
    this.toggleEditProject();
  };

  onEditTask = () => {
    this.getProjectDetails();
  };

  onSearchTasks = (e) => {
    const searchText = e.target.value;
    this.setState({
      isLoading: true,
    });
    if (searchText.length > 0) {
      const searchData = this.state.taskList.filter(function (item) {
        const itemData = item.name + " " + item.description;
        const textData = searchText.trim().toLowerCase();
        return itemData.trim().toLowerCase().indexOf(textData) !== -1;
      });
      this.setState({
        searchTaskList: searchData,
        searchText: searchText,
        isLoading: false,
      });
    } else {
      this.setState({
        searchText,
      });
      this.getProjectDetails();
    }
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            {!this.state.toggleEditProject && (
              <>
                <h2>
                  {this.state.project.name}
                  <Badge variant="primary">
                    {this.state.searchTaskList.length}
                  </Badge>
                </h2>
                <div>{this.state.project.description}</div>
              </>
            )}
            {this.state.toggleEditProject && (
              <>
                <ProjectEdit
                  project={this.state.project}
                  onCompleteProjectEdit={this.onCompleteProjectEdit}
                />
              </>
            )}
          </div>
          <div className="float-left ml-5">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type Task to Search..."
                aria-label="Type Task to Search..."
                aria-describedby="basic-addon2"
                onChange={(e) => this.onSearchTasks(e)}
              />
            </InputGroup>
          </div>
          <div className="float-right">
            <button
              className={`btn btn-outline-${
                this.state.project.status === 1 ? "success" : "info"
              } mr-2`}
              disabled
            >
              {this.state.project.status === 1 && (
                <span className="">✓ Completed</span>
              )}
              {this.state.project.status === 0 && (
                <span className="">Pending...</span>
              )}
            </button>
            <Button
              className="btn btn-success mr-2"
              onClick={() => this.toggleEditProject()}
            >
              {!this.state.toggleEditProject && <span>Edit </span>}
              {this.state.toggleEditProject && <span>Cancel Editing</span>}
            </Button>
            <Button
              className="btn btn-info mr-2"
              onClick={() => this.toggleAddTask()}
            >
              {!this.state.toggleAddTask && <span>+ Add Task</span>}
              {this.state.toggleAddTask && <span>Cancel Adding</span>}
            </Button>
          </div>
          <div className="clearfix"></div>
        </div>

        {this.state.toggleAddTask && (
          <TaskCreate
            project_id={this.props.match.params.id}
            onCompleteTaskCreate={this.onCompleteTaskCreate}
          />
        )}

        {this.state.isLoading && (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

        {this.state.searchTaskList.length === 0 && (
          <Alert variant={"warning"}>
            No Task Found !! Please create one...
          </Alert>
        )}

        <TaskList
          taskList={this.state.searchTaskList}
          isDetailsView={true}
          onEditTask={this.onEditTask}
        />
      </>
    );
  }
}

export default ProjectView;
