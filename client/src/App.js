import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header.js";
import DisplayApp from "./components/DisplayApp.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <DisplayApp />
      </div>
    );
  }
}

export default App;
