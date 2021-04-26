import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import AccountService from "../services/account.service"
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const account_type = value => {
    if (value != "Checking" && value != "Savings") {
        return (
        <div className="alert alert-danger" role="alert">
            The account type must either be Checking or Savings.
        </div>
        );
    }
};

const account_balance = value => {
  if (value < 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Account Balance must be greater than or equal to 100.
      </div>
    );
  }
};

const userId = value => {
  if (value == null) {
    return (
      <div className="alert alert-danger" role="alert">
        userId is required!
      </div>
    );
  }
};

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.onChangeAccountType = this.onChangeAccountType.bind(this);
    this.onChangeAccountBalance = this.onChangeAccountBalance.bind(this);
    this.onChangeuserId = this.onChangeuserId.bind(this);

    this.state = {
      account_type: "",
      account_balance: "",
      userId:""
    };
  }

  onChangeAccountType(e) {
    this.setState({
      account_type: e
    });
  }

  onChangeAccountBalance(e) {
    this.setState({
      account_balance: e.target.value
    });
  }

  onChangeuserId(e) {
    this.setState({
      userId: e.target.value
    });
  }

  handleCreateAccount(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AccountService.createAccount(
        this.state.account_type,
        this.state.account_balance,
        this.state.userId,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleCreateAccount}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <DropdownButton id="dropdown-basic-button" title="Account Type" onSelect={this.onChangeAccountType}>
                <Dropdown.Item eventKey="Checking">Checking</Dropdown.Item>
                <Dropdown.Item eventKey="Savings">Savings</Dropdown.Item>
                </DropdownButton>


                <div className="form-group">
                  <label htmlFor="account_balance">Account Balance</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="account_balance"
                    value={this.state.account_balance}
                    onChange={this.onChangeAccountBalance}
                    validations={[required, account_balance]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="userId">User ID</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="userId"
                    value={this.state.userId}
                    onChange={this.onChangeuserId}
                    validations={[required, userId]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Create Account</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
