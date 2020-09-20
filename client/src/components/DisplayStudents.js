import React, { Component } from "react";

class DisplayStudents extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
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
  componentDidMount() {
    fetch("/api/students")
      .then((res) => res.json())
      .then((students) => this.setState({ students: students }));
  }

  render() {
    return (
      <div className="table table-responsive container">
        <table className="table table-bordered container">
          <thead className="thead-dark">
            <tr>
              {this.state.HeaderItems.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.students).map((k, i) => {
              let data = this.state.students[k];
              // console.log(data);
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

export default DisplayStudents;
