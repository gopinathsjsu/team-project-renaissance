import React, { Component } from "react";
import AuthService from "../services/auth.service";
import TransferService from "../services/transfer-funds.service";
import AccountService from "../services/account.service";

export default class TransactionPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        loggedInUser: AuthService.getLoggedInUser(),
        allTransactions: []
    };
  }

  async componentDidMount() {
    const account_number = await AccountService.getAccountNumber(AuthService.getLoggedInUser().username);
    console.log("account_number: " + JSON.parse(JSON.stringify(account_number.data[0])));

    TransferService.fetchAll(JSON.parse(JSON.stringify(account_number.data[0].account_number))).then(
      response => {
        this.setState({
          allTransactions: response.data
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
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>Your Transactions</h3>
          </header>
          <table className="table">
            <thead>
              <th scope="col">#</th>
              <th scope="col">Beneficiary</th>
              <th scope="col">Amount</th>
              <th scope="col">Transaction ID</th>
              <th scope="col">Date</th>
            </thead>
          <tbody>
            {(this.state.allTransactions.length > 0) ? this.state.allTransactions.map((transaction, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>{transaction.beneficiary_id}</td>
                  <td>{transaction.transaction_amount}</td>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            }) :
              <tr>
                <td>No Transactions</td>
              </tr>
            }       
          </tbody>
          </table>
        </div>
      );
    }
  }