import React from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../../constants";
import TaskCreate from "../tasks/TaskCreate";
import TaskList from "../tasks/TaskList";

class ProjectView extends React.Component {
  state = {
    project: {},
    taskList: [],
    isLoading: false,

    toggleAddTask: false,
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
        project: res.data.data,
        isLoading: false,
      });
    });
  };

  toggleAddTask = () => {
    this.setState({
      toggleAddTask: !this.state.toggleAddTask,
    });
  };

  onCompleteTaskCreate = (task) => {
    this.toggleAddTask();
    let tasks = this.state.taskList;
    tasks.unshift(task);
    this.setState({
      taskList: tasks,
    });
  };

  render() {
    return (
      <>
        <div className="header-part">
          <div className="float-left">
            <h2>
              {this.state.project.name}
              <Badge variant="primary">{this.state.taskList.length}</Badge>
            </h2>
          </div>
          <div className="float-right">
            <Button className="btn btn-success mr-2">Edit</Button>
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
        <div>{this.state.project.description}</div>

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

        <TaskList taskList={this.state.taskList} isDetailsView={true} />
      </>
    );
  }
}

export default ProjectView;
