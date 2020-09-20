import React, { Component } from "react";
class StudentAddForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      mailingAddress: "",
      gpa: 0.0,
      email: "",
      studentID: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { name, value, type } = event.target;
    if (type === "number") {
      if (value <= 4.0 && value >= 0) {
        this.setState({ [name]: value });
      } else alert("GPA should be between 0 & 4");
    } else {
      this.setState({ [name]: value });
    }
  }

  handleBlur(event) {
    var num = parseFloat(this.state.gpa);
    var cleanNum = num.toFixed(2);
    this.setState({ gpa: cleanNum });
  }

  componentDidMount() {
    fetch("http://35.232.157.38/api/students/id")
      .then((res) => res.json())
      .then((studentID) => this.setState({ studentID: studentID + 1 }))
      .catch((err) => console.error(err));
  }

  componentDidUpdate() {
    fetch("http://35.232.157.38/api/students/id")
      .then((res) => res.json())
      .then((studentID) => this.setState({ studentID: studentID + 1 }))
      .catch((err) => console.error(err));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.mailingAddress === "" ||
      this.state.email === ""
    ) {
      alert("Enter all fields..");
    } else {
      fetch(
        `/api/students/add?firstName=${this.state.firstName}&lastName=${this.state.lastName}&mailingAddress=${this.state.mailingAddress}&gpa=${this.state.gpa}&email=${this.state.email}`
      ).catch((err) => console.error(err));
      // console.log("Submitted");
      alert("Student with ID : " + this.state.studentID + " has been added");
      this.setState({
        firstName: "",
        lastName: "",
        mailingAddress: "",
        gpa: 0.0,
        email: "",
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="studentid">Student Id:</label>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.studentID}
                    name="studentId"
                    readOnly
                    className="input_id"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="firstname">First Name:</label>
                  <span className="required">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.firstName}
                    name="firstName"
                    placeholder="John"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="lastname">Last Name:</label>
                  <span className="required">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.lastName}
                    name="lastName"
                    placeholder="Doe"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="mailaddress">Mailing Address:</label>
                  <span className="required">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    value={this.state.mailingAddress}
                    name="mailingAddress"
                    placeholder="1312 Lakeshore Circle"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="gpa">GPA:</label>
                  <span className="required">*</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={this.state.gpa}
                    name="gpa"
                    placeholder="gpa"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="email">Email:</label>
                  <span className="required">*</span>
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="@gmail.com"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default StudentAddForm;
