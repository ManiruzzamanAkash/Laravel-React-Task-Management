import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div className="container">
      <h2>Hello From React Component</h2>
    </div>
  );
}

export default App;

if (document.getElementById("app")) {
  ReactDOM.render(<App />, document.getElementById("app"));
}
