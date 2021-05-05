import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProfileModal from "./profile_modal.component";
import AccountService from "../services/account.service";

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
        showModal : false,
        allUsers: [],
        userAccounts: AccountService.getAccountsForUser(AuthService.getLoggedInUser().username)
    };
  }

  handleModalClose(e) {
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

  deleteAccount(account) {
    AccountService.delete(account);
    window.location.reload();
  }

  handleRefund() {
    //AccountService.fetchAccountBalance();
    // window.location.reload();
    alert("hi from refund");
  }

  // updateUser(id, ) {
  //   AccountService.update();
  // }

  componentDidMount() {
    AccountService.getAll().then(response => this.setState({
      allUsers: response.data
    }));
  }

  render() {
    const { loggedInUser } = this.state;
    const { userAccounts } = this.state;
    // console.log("user accounts", this.state.userAccounts);
    return (
      (loggedInUser.role === 1) ?
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
          <p>
            <strong>role:</strong>{" "}
            {loggedInUser.role}
          </p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Account Number</th>
                <th scope="col">Account Type</th>
                <th scope="col">Account Balance</th>
                <th scope="col" colSpan="4"></th>
              </tr>
            </thead>
            <tbody>
              {(this.state.userAccounts.length > 0) ? this.state.userAccounts.map((account, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{account.account_number}</td>
                    <td>{account.account_type}</td>
                    <td>{account.account_balance}</td>
                  </tr>
                )
              }) :
                <tr>
                  <td>No active users</td>
                </tr>
              }
            </tbody>
          </table>
          <Button type="button" className="btn btn-default" onClick={this.handleModalOpen}>
            Update Profile
          </Button>
          <ProfileModal showModal={this.state.showModal} onClose={this.handleModalClose} />
        </div>
      : (
      <div className="container">
        <header>
          <h3>
            <strong>Active Users</strong>
          </h3>
        </header>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Account Type</th>
              <th scope="col" colSpan="4"></th>
            </tr>
          </thead>
          <tbody>
            {(this.state.allUsers.length > 0) ? this.state.allUsers.map((user, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>{user.username}</td>
                  <td>{user.account_type}</td>
                  <td>
                    <input type="number" className="form-control" min="0" placeholder="Refund amount" />
                  </td>
                  <td>
                    <Button type="button" onClick={() => this.handleRefund()} name="Refund">Refund</Button>
                  </td>
                  <td>
                    <Button type="button" onClick={() => this.updateUser()} name="Update">Update</Button>
                  </td>
                  <td>
                    <Button type="button" onClick={() => this.deleteAccount(user.account_number)} name="Delete">Delete</Button>
                  </td>
                </tr>
              )
            }) :
              <tr>
                <td>No active users</td>
              </tr>
            }
          </tbody>
        </table>
        <ProfileModal showModal={this.state.showModal} onClose={this.handleModalClose} />
      </div>
      )
    );
  }
}
