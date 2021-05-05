import React, { Component} from "react";

//import BillPayService from "../services/billpay.service";
import ExternalPayService from "../services/extarnalpay.service";
import {Button} from 'react-bootstrap';

export default class Billpay extends Component {
  
  constructor(props) {
    super(props);

    this.state ={
      //billpayData: null
      billpayData: []
    };
  }

  
    componentDidMount() {
      ExternalPayService.getAllPayee().then(
        response => {
          this.setState({
            billpayData: response.data
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

  /*handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });


  }*/

  handlePay() {
    alert("pay button hit");
  }
  
  render() {
    console.log(this.state.billpayData);
    return (
      <div className="container">
          <h2 className="text-center">Pending Bills</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Merchant Name</th>
              <th scope="col">Username</th>
              <th scope="col">Account Number</th>
              <th scope="col">Bill Amount</th>
              <th scope="col">Bill Status</th>
              <th scope="col" colSpan="6"></th>
            </tr>
          </thead>
          <tbody>
            {(this.state.billpayData.length > 0) ? this.state.billpayData.map((merchant, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>{merchant.merchant_name}</td>
                  <td>{merchant.username}</td>
                  <td>{merchant.merchant_acctno}</td>
                  <td>{merchant.bill_amount}</td>
                  <td>{merchant.bill_status}</td>
                  <td>
                    <Button type="button" onClick={() => this.handlePay()} name="Pay">Pay</Button>
                  </td>
                </tr>
              )
            }) :
              <tr>
                <td>No Pending Bill</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

    );
  }
}