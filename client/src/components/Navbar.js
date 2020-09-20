import React from "react";
function Navbar(props) {
  return (
    <div className="container-fluid">
      <ul id="nav">
        <li id="firstnav">
          <a href="# " onClick={props.handleUpdateHome}>
            Home
          </a>
        </li>
        <li>
          <a href="# " onClick={props.handleDisplayAll}>
            Display All
          </a>
        </li>
        <li>
          <a href="# " onClick={props.handleSearch}>
            Search
          </a>
        </li>
        <li>
          <a href="# " onClick={props.handleAddStudent}>
            Add
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
