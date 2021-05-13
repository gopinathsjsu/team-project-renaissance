import React, { Component } from "react";
import AuthService from "../services/auth.service";
import TransferService from "../services/transfer-funds.service";
import AccountService from "../services/account.service";

export default class TransactionPage extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            loggedInUser: AuthService.getLoggedInUser(),
            acc_no:'',
            allTransactions: [],
            userAccount:[]
        };
    }

    async handleChange(e) {
        const date_selected =  e.target.value

        // let account_no = JSON.parse(AccountService.getAccountNumber(AuthService.getLoggedInUser().username));

        TransferService.searchTransactions(date_selected, this.state.acc_no).then(response => {
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
        )
    }

    async componentDidMount() {
        AccountService.getAccountsForUser(AuthService.getLoggedInUser().username).then(response => this.setState({
            userAccount: response.data
        }));
        AccountService.getAccountNumber(AuthService.getLoggedInUser().username).then(response => 
        // console.log("here", JSON.parse(JSON.stringify(response.data[0]))), {
        {
            this.setState({
                acc_no: JSON.parse(JSON.stringify(response.data[0].account_number))
            })
        });
        //console.log("account_number: " + JSON.parse(JSON.stringify(account_number.data[0])));  
    }

  render() {
    const { acc_no } = this.state;
      return (
        <div className="container">
            <header className="jumbotron">
            <h3>Search Your Transactions</h3>
            </header>
            
            <label>Pick the dates you want to view your transactions from</label>
            <select
                value={this.state.date_selected}
                onChange={this.handleChange}

            >
                <option default value> -- select a date -- </option>
                <option value="3">past 3 months</option>
                <option value="6">past 6 months</option>
                <option value="9">past 9 months</option>
                <option value="12">past 12 months</option>
                <option value="15">past 15 months</option>
                <option value="18">past 18 months</option>
            </select>
            
            <table className="table">
            <thead>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Amount</th>
                {/* <th scope="col">Transaction Source</th> */}
                <th scope="col">Date</th>
            </thead>
            <tbody>
            {(this.state.allTransactions.length > 0) ? this.state.allTransactions.map((transaction, index) => {
                return (
                <tr>
                    <td>{index}</td>
                    {transaction.beneficiary_id == acc_no ? (
                        <td>Credit</td>
                    ) : (
                        <td>Debit</td>
                    )}
                    <td>{transaction.transaction_amount}</td>
                    {/* <td>{transaction.type}</td>
                    <td>{transaction.source}</td> */}
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