import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ExternalPayService from "../services/extarnalpay.service";
import { Button, Modal } from 'react-bootstrap';
import Input from "react-validation/build/input";

export default class Billpay extends Component {

  constructor(props) {
    super(props);
    this.handlePay = this.handlePay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      udata: AuthService.getLoggedInUser(),
      paidbillpayData: [],
      unpaidbillpayData: [],
      mAcctNo: null,
      billAmount: null,
      mName: null,
      recPeriod: null,
      firstRender: true,
      showModal : false,
      allTransactions: []

    };
  }

  async handleChange(e) {
    const date_selected =  e.target.value
    ExternalPayService.searchBillsPaid(date_selected, this.state.udata.username).then(response => {
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
  componentDidMount() {
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

  
    handlePay(e) {

    var rowId = e.target.parentNode.parentNode.id;
    console.log(e.target.parentNode.parentNode);
    
    console.log(document.getElementById(rowId));
    //this gives id of tr whose button was clicked

    var data = document.getElementById(rowId).querySelectorAll(".row-data");

    console.log(data);

    var mAcctNo = 0;
    var billAmount = 0;
    var mName = "";
    var recPeriod = "";
    if (rowId === "0") {
      mAcctNo = data[4].value;
      billAmount = data[6].value;
      mName = data[2].value;
      recPeriod = data[8].value;
      
    } else {
      mAcctNo = data[2].innerHTML;
      
      billAmount = data[4].value;
      mName = data[1].innerHTML;
      recPeriod = data[6].value;
     
    }
    this.setState({
   
    billAmount : billAmount,
    mName : mName,
    mAcctNo :mAcctNo,
    recPeriod :recPeriod,
    firstRender: false,
  });

    if (mName === "" || mAcctNo === "" || billAmount === "" || recPeriod === "") {
          this.setState({
            showModal: true
         });
    }  else {

    ExternalPayService.payBill(this.state.udata.username, billAmount, mAcctNo, mName, recPeriod).then(
      response => {
        console.log(response);
        if (response.data === 'success') {
          this.props.history.push("/billpay");
          window.location.reload();
        } else {
          //alert("Bill Payment Unsucessfull (Low Balance)");
          //this.renderModal();
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
    }

  }

  renderSearchForm() {
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
                <th scope="col">Recurring Frequency</th>
                <th scope="col">Merchant Name</th>
                <th scope="col">Date</th>
            </thead>
            <tbody>
            {(this.state.allTransactions.length > 0) ? this.state.allTransactions.map((transaction, index) => {
                return (
                <tr>
                    <td>{index}</td>
                    <td>Debit</td>
                    <td>{transaction.bill_amount}</td>
                    <td>{transaction.recPeriod}</td>
                    <td>{transaction.merchant_name}</td>
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


  render() {
    const handleClose = () => {
      this.setState({
        showModal: false
      });
  
    };
    return (

      

      <div className="container">
      
      <Modal show={this.state.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><b>Payment Failed</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter all the required fields</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
       
        <h2 className="text-center">Pay Bills</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Merchant Name</th>
              <th scope="col">Account Number</th>
              <th scope="col">Bill Amount</th>
              <th scope="col">Recurring Period</th>
              <th scope="col" colSpan="7"></th>
            </tr>
          </thead>
          <tbody>
          <tr id="0">
                  <td class="row-data">0</td>
                  <td class="row-data">
                  <input type="text"  class="row-data" placeholder=""  />
                  </td>
                  <td class="row-data">
                  <input type="text"  class="row-data" placeholder="" />
                  </td>
                  <td class="row-data">
                    <input type="number" min = "0" class="row-data" placeholder="" />
                  </td>
                  <td class="row-data">
                    <input type="number" min = "0" class="row-data" placeholder="" />
                  </td>
                  <td>
                    <Button type="button" onClick={this.handlePay} name="Add Payee">Pay</Button>
                  </td>
                </tr>
            {(this.state.unpaidbillpayData.length > 0) ? this.state.unpaidbillpayData.map((merchant, index) => {
              return (
                <tr id={index+1}>
                  <td class="row-data">{index+1}</td>
                  <td class="row-data">{merchant.merchant_name}</td>
                  <td class="row-data">{merchant.merchant_acctno}</td>
                  <td class="row-data">
                    <input type="number" min = "0" class="row-data" placeholder="" />
                  </td>
                  <td class="row-data">
                    <input type="number" min = "0" class="row-data" placeholder="" />
                  </td>
                  <td>
                    <Button type="button" onClick={this.handlePay} name="Pay">Pay</Button>
                  </td>
                </tr>
              )
            }) :
              <tr>
                <td colSpan = "3">No External Payees</td>
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
              <th scope="col">Recurring Period</th>
              <th scope="col" colSpan="4"></th>
            </tr>
          </thead>
          <tbody>
            {(this.state.paidbillpayData.length > 0) ? this.state.paidbillpayData.map((merchant, index) => {
              return (
                <tr id={index}>
                  <td>{index}</td>
                  <td>{merchant.merchant_name}</td>
                  <td>{merchant.merchant_acctno}</td>
                  <td>{merchant.bill_amount}</td>
                  <td>{merchant.recPeriod}</td>
                </tr>
              )
            }) :
              <tr>
                <td>No Paid Bill</td>
              </tr>
            }
          </tbody>
        </table>

        {this.renderSearchForm()}


      </div>




    );
  }
}