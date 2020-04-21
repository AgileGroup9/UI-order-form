import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";

// Renders the react app into a div in index.html
var mountNode = document.getElementById("container");
ReactDOM.render(<App/>, mountNode);