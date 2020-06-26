import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  state = {
    counter: 0,
  };

  incrementCounter = (value) => {
    let counter = this.state.counter + value;
    this.setState({
      counter,
    });
  };

  decrementCounter = (value) => {
    let counter = this.state.counter - value;
    this.setState({
      counter,
    });
  };

  render() {
    return (
      <div>
        <div className="container mt-5">
          <h2>Count: {this.state.counter}</h2>
          <p>
            <button
              className="btn btn-success btn-lg"
              onClick={() => this.incrementCounter(10)}
            >
              +
            </button>

            <button
              className="btn btn-danger btn-lg ml-2"
              onClick={() => this.decrementCounter(5)}
            >
              -
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
