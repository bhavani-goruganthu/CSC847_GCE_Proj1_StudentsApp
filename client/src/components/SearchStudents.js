import React, { Component } from "react";
import DisplaySearchResults from "./DisplaySearchResults";
class SearchStudents extends Component {
  constructor() {
    super();
    this.state = {
      studentId: "",
      firstName: "",
      lastName: "",
      searchresults: "",
      filteredStudents: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    if (
      this.state.firstName === "" &&
      this.state.lastName === "" &&
      this.state.studentId === ""
    ) {
      alert("Enter atleast one search parameter..");
    } else {
      fetch(
        `http://35.232.157.38/api/students/search?studentID=${this.state.studentId}&firstName=${this.state.firstName}&lastName=${this.state.lastName}`
      )
        .then((res) => res.json())
        .then((filteredStudents) =>
          this.setState({ filteredStudents: filteredStudents })
        )
        .then(() => {
          if (this.state.filteredStudents.length !== 0) {
            let searchresults = <DisplaySearchResults value={this.state} />;
            this.setState({ searchresults: searchresults });
          } else {
            this.setState({ searchresults: "No such Results available.." });
          }
        })
        // .then(() => {
        //   console.log(this.state.filteredStudents);
        // })
        .catch((err) => console.error(err));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <form>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="studentid">Student Id:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.studentId}
                      name="studentId"
                      placeholder="Student ID"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td className="tdcenter">(or)</td>
                </tr> */}
                <tr>
                  <td>
                    <label htmlFor="firstname">First Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.firstName}
                      name="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td className="tdcenter">(or)</td>
                </tr> */}
                <tr>
                  <td>
                    <label htmlFor="lastname">Last Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={this.state.lastName}
                      name="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <span className="btnpadding">
              <button
                className="btn btn-primary"
                onClick={this.handleSearchSubmit}
              >
                Search for Students
              </button>
            </span>
          </form>
        </div>
        <br />
        <div>
          <p>
            <b>Search Results</b>
          </p>
          {this.state.searchresults}
        </div>
      </div>
    );
  }
}

export default SearchStudents;
