import React from "react";
import headerimage from "../students.jpg";

function Header() {
  return (
    <div className="container-fluid">
      <header className="headercss container-fluid">
        <img
          src={headerimage}
          alt="student"
          className="rounded-circle"
          width="180"
          height="100"
        />
        Student Management
      </header>
    </div>
  );
}
export default Header;
