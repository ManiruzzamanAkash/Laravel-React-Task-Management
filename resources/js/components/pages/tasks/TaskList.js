import React from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";

class TaskList extends React.Component {
  render() {
    return (
      <>
        {this.props.taskList.map((task, index) => (
          <Card key={index} className="mt-1 mb-1">
            <Card.Body>
              <p>
                {task.status === 1 && (
                  <del className="text-success">
                    <strong>
                      {task.name}{" "}
                      <Badge variant="primary">{task.tasks_count}</Badge>
                    </strong>
                  </del>
                )}

                {task.status === 0 && (
                  <span>
                    {task.name}{" "}
                    <Badge variant="primary">{task.tasks_count}</Badge>
                  </span>
                )}
              </p>
              {this.props.isDetailsView && (
                <Card.Text>{task.description}</Card.Text>
              )}
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default TaskList;
