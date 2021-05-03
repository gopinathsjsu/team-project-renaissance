import React, { Component, Button } from "react";

//import Form from "react-validation/build/form";
//import Input from "react-validation/build/input";
//import React, { Component } from "react";
//import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Modal from 'react';
//import Modal from "react-modal";
import CheckButton from "react-validation/build/button";
//import 'react-confirm-alert/src/react-confirm-alert.css'; 
import BillPayService from "../services/billpay.service";
import ExternalPayService from "../services/extarnalpay.service";

export default class Billpay extends Component {
  
  constructor(props) {
    super(props);

    this.state ={
      billpayData: null
      //billpayData: []
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

  generateList() {

    var loopData = ''
    loopData += '<thead><tr><th> id</th><th> Merchant Name</th><th> User Name</th><th> Account No</th><th> Amount</th>'
    loopData += '</tr></thead> <tbody>'
 
    var payeeList = this.state.billpayData;
    console.log(payeeList);
    for (const key in payeeList){
      if(payeeList.hasOwnProperty(key)){
        loopData += '<tr>';
        for (const key1 in payeeList[key]){
          console.log(payeeList[key][key1]);
          if (key1 !== "createdAt" && key1 !== "updatedAt" ) {
            //console.log(key1);
          loopData += '<td>' + payeeList[key][key1] + '</td>'; 
          
          }
        }
        loopData += '<td><button type="submit" onClick={this.payBill}> Pay </button></td>';
        
        loopData += '</tr>'
      }
    }
    loopData += '</tbody>';
    return loopData;
    
  }
  


  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    //this.form.validateAll();

  }


  render() {

    
    
    return (
      <div className="container">
        <br></br>
        <Container>
          <h2 className="text-center">Pending Bills</h2>
          <br></br>
          <table className="table table-striped table-bordered" dangerouslySetInnerHTML={{ __html: this.generateList()}}>

          </table>
          
        </Container>
      </div>




    );
  }
}