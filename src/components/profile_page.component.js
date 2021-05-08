import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProfileModal from "./profile_modal.component";
import AccountService from "../services/account.service";
import ExternalPayService from "../services/extarnalpay.service";

import {
  Button
} from 'react-bootstrap';
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleRefund = this.handleRefund.bind(this);
    this.onChangeAccountRefund = this.onChangeAccountRefund.bind(this);

    this.state = {
      loggedInUser: AuthService.getLoggedInUser(),
      showModal: false,
      allUsers: [],
      userAccounts: [],
      refund_amount: 0
    };
  }

  handleModalClose(e) {
    //e.preventDefault();

    this.setState({
      showModal: false
    });
  }

  handleModalOpen(e) {
    // e.preventDefault();
    this.setState({
      showModal: true
    });
  }

  deleteAccount(account) {
    AccountService.delete(account);
    window.location.reload();
  }
  onChangeAccountRefund(e) {
    this.setState({
      refund_amount: e.target.value
    });
  }
  handleRefund(e) {
    //AccountService.fetchAccountBalance();
    // window.location.reload();
    //alert("hi from refund");
    var rowId = e.target.parentNode.parentNode.id;
    //console.log(rowId);
    //console.log(document.getElementById(rowId));
    //this gives id of tr whose button was clicked

    var data = document.getElementById(rowId).querySelectorAll(".row-data");

    console.log(data);

    var refundAmount = data[4].value;
    var uname = data[1].innerHTML;
    if (refundAmount === "") {
      alert('Please enter a valid refund amount');
    } else {
      console.log(refundAmount);


      ExternalPayService.refund(uname, refundAmount).then(
        response => {
          console.log(response);
          if (response.data === 'sucess') {
            alert("Refund Sucessfull");
            this.props.history.push("/profile");
            window.location.reload();
          }
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    }
  }

  // updateUser(id, ) {
  //   AccountService.update();
  // }

  componentDidMount() {
    AccountService.getAll().then(response => this.setState({
      allUsers: response.data
    }));
    AccountService.getAccountsForUser(AuthService.getLoggedInUser().username).then(
      response => {
        this.setState({
          userAccounts: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const { loggedInUser } = this.state;
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
                  <td>No active accounts</td>
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
                    <tr id={index}>
                      <td class="row-data">{index}</td>
                      <td class="row-data">{user.username}</td>
                      <td class="row-data">{user.account_type}</td>
                      <td class="row-data">
                        <input type="number" class="row-data" placeholder="Refund amount" onChange={this.onChangeRefund} />
                      </td>
                      <td>
                        <Button type="button" onClick={this.handleRefund} name="Refund" >Refund</Button>
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
