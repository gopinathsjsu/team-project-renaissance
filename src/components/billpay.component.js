import React, { Component} from "react";

//import BillPayService from "../services/billpay.service";
import AuthService from "../services/auth.service";
import ExternalPayService from "../services/extarnalpay.service";
import {Button} from 'react-bootstrap';

export default class Billpay extends Component {
  
  constructor(props) {
    super(props);
    this.handlePay = this.handlePay.bind(this);
    this.state ={
      //billpayData: null
      udata: AuthService.getLoggedInUser(),
      paidbillpayData: [],
      unpaidbillpayData: []
    };
  }

  
    componentDidMount() {
      console.log('test0');
      console.log(this.state.username);
      ExternalPayService.getAllPayee(this.state.udata.username, 'unpaid').then(
        response => {
          console.log(response);
          this.setState({
            unpaidbillpayData: response
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
    
    ExternalPayService.getAllPayee(this.state.udata.username, 'paid').then(
      response => {
        console.log(response);
        this.setState({
          paidbillpayData: response
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

  handlePay(e) {
    
    //console.log(e.target.parentNode);
    //console.log(e.target.parentNode.parentNode);
    
    var rowId = e.target.parentNode.parentNode.id;
    console.log(rowId);
    console.log(document.getElementById(rowId));
              //this gives id of tr whose button was clicked
              
                var data = document.getElementById(rowId).querySelectorAll(".row-data"); 

                console.log(data);
  
                var id = data[2].innerHTML;
                var billAmount = data[3].innerHTML;


                alert("id " + id + "\nBill Amount: " + billAmount );

                ExternalPayService.payBill(this.state.udata.username, billAmount, id).then(
                  response => {
                    console.log(response);
                    if (response.data === 'sucess') {
                      alert("Bill Payment Sucessfull");
                      this.props.history.push("/billpay");
                      window.location.reload();
                    } else {
                      alert("Bill Payment Unsucessfull (Low Balance)");
                    }
                    console.log('above is update from service');
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
                //this.render();
                
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
              <th scope="col">Account Number</th>
              <th scope="col">Bill Amount</th>
              <th scope="col">Bill Status</th>
              <th scope="col" colSpan="6"></th>
            </tr>
          </thead>
          <tbody>
            {(this.state.unpaidbillpayData.length > 0) ? this.state.unpaidbillpayData.map((merchant, index) => {
              return (
                <tr id ={index}>
                  <td class = "row-data">{index}</td>
                  <td class = "row-data">{merchant.merchant_name}</td>
                  <td class = "row-data">{merchant.merchant_acctno}</td>
                  <td class = "row-data">{merchant.bill_amount}</td>
                  <td class = "row-data">{merchant.bill_status}</td>
                  <td>
                    <Button type="button" onClick={this.handlePay} name="Pay">Pay</Button>
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
        
        <h2 className="text-center">Paid Bills</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Merchant Name</th>
              <th scope="col">Account Number</th>
              <th scope="col">Bill Amount</th>
              <th scope="col" colSpan="4"></th>
            </tr>
          </thead>
          <tbody>
            {(this.state.paidbillpayData.length > 0) ? this.state.paidbillpayData.map((merchant, index) => {
              return (
                <tr id = {index}> 
                  <td>{index}</td>
                  <td>{merchant.merchant_name}</td>
                  <td>{merchant.merchant_acctno}</td>
                  <td>{merchant.bill_amount}</td>
                </tr>
              )
            }) :
              <tr>
                <td>No Paid Bill</td>
              </tr>
            }
          </tbody>
        </table>


      </div>
  

      

    );
  }
}