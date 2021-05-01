import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProfileModal from "./profile_modal.component";

import {
  Button
} from 'react-bootstrap';
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);

    this.state = {
        loggedInUser: AuthService.getLoggedInUser(),
        showModal : false
    };
  }

  handleModalClose(e){
    //e.preventDefault();

		this.setState({
			showModal : false
		});
	}

  handleModalOpen(e) {
    // e.preventDefault();
		this.setState({
			showModal : true
		});
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
        <Button type="button" className="btn btn-default" onClick={this.handleModalOpen}>
          Update Profile
        </Button>
        <ProfileModal showModal={this.state.showModal} onClose = {this.handleModalClose} />
      </div>
    );
  }
}