import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import ProfileModal from "./profile_modal.component";
import AccountService from "../services/account.service";
import ExternalPayService from "../services/externalpay.service";

import {
  Button
} from 'react-bootstrap';
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleRefund = this.handleRefund.bind(this);
    this.handleClose = this.handleClose.bind(this);
    //this.deleteAccount = this.deleteAccount.bind(this);
    this.onChangeAccountRefund = this.onChangeAccountRefund.bind(this);

    this.state = {
      loggedInUser: AuthService.getLoggedInUser(),
      showModal: false,
      allUsers: [],
      userAccounts: [],
      refund_amount: 0,
      validationModal: false,
      refundMessage: null
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

    var rowId = e.target.parentNode.parentNode.id;

    var data = document.getElementById(rowId).querySelectorAll(".row-data");


    var refundAmount = data[4].value;
    var uname = data[1].innerHTML;
    if (refundAmount === "") {
      this.setState({
        validationModal: true,
        refundMessage: "Please enter a valid refund amount"
     });
    } else {
      ExternalPayService.refund(uname, refundAmount).then(
        response => {
          
          if (response.data === 'sucess') {
            this.setState({
              validationModal: true,
              refundMessage: "Refund of $"+ refundAmount + " successful"
           });
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

  handleClose (e) {
    this.setState({
      validationModal: false,
    });
    this.props.history.push("/profile");
    window.location.reload();
  };
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
        <Modal show={this.state.validationModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>Refund Status</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.state.refundMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        
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
