import React, { Component } from "react";

class DisplaySearchResults extends Component {
  constructor() {
    super();
    this.state = {
      HeaderItems: [
        "Student ID",
        "First Name",
        "Last Name",
        "Mailing Address",
        "GPA",
        "eMail",
      ],
    };
  }

  render() {
    // console.log(this.props.value.filteredStudents);
    return (
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead className="thead-dark">
            <tr>
              {this.state.HeaderItems.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.value.filteredStudents).map((k, i) => {
              let data = this.props.value.filteredStudents[k];
              return (
                <tr key={i}>
                  <td>{data.StudentID}</td>
                  <td>{data.FirstName}</td>
                  <td>{data.LastName}</td>
                  <td>{data.MailingAddress}</td>
                  <td>{data.GPA}</td>
                  <td>{data.Email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default DisplaySearchResults;
