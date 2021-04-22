import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loggedInUser: AuthService.getLoggedInUser()
    };
  }

  render() {
    const { loggedInUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Profile</strong> 
          </h3>
        </header>
        <p>
          <strong>First Name:</strong>{" "}
          {loggedInUser.firstname}
        </p>
        <p>
          <strong>Last Name:</strong>{" "}
          {loggedInUser.lastname}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {loggedInUser.address}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {loggedInUser.email}
        </p>
      </div>
    );
  }
}