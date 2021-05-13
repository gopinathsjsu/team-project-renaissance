import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import TransferService from "../services/transfer-funds.service";
import AccountService from "../services/transfer-funds.service";
// import Select from 'react-select';
// import { render } from "@testing-library/react";
import { Modal, Button } from 'react-bootstrap';
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

const payeeid = value => {
    if (value.length !== 16 ){
        return (
            <div className='alert alert-danger' role="alert">
                Please enter a valid account number
            </div>
        );
    } 
};

const beneficiaryid = value => {
    if (value.length !== 16 ){
        return (
            <div className='alert alert-danger' role="alert">
                Please enter a valid account number
            </div>
        );
    }

};


const amount = value => {
    if (value > 400){
        return (
            <div className= "alert alert-danger" role="alert">
                You have insufficient account balance to make this transfer!
            </div>
        );
    }
};

const recurring_period = value => {
  if(value > 12 || value < 0){
    return (
      <div className= "alert alert-danger" role="alert">
          Please enter a valid number of months!  
      </div>
    )
  }
}
export default class TransferFunds extends Component {
    constructor(props) {
        super(props);
        this.handleTransferFunds = this.handleTransferFunds.bind(this);
        this.onChangePayeeid = this.onChangePayeeid.bind(this);
        this.onChangeBeneficiaryid = this.onChangeBeneficiaryid.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeRecurringPeriod = this.onChangeRecurringPeriod.bind(this);

        this.state = {
          payeeid: "",
          beneficiaryid: "",
          amount:"" ,
          recurring_period: "",
          validationModal: false,
          successMessage: null
        };
    }

    onChangePayeeid(e) {
      this.setState({
        payeeid: e.target.value
      });
    }

    onChangeBeneficiaryid(e){
      this.setState({
        beneficiaryid: e.target.value
      });
    }

    onChangeAmount(e) {
      this.setState({
        amount: e.target.value
      });
    }

    onChangeRecurringPeriod(e) {
      this.setState({
        recurring_period: e.target.value
      });
    }

    handleTransferFunds(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0){
            TransferService.transfer(
                this.state.payeeid,
                this.state.beneficiaryid,
                this.state.amount,
                this.state.recurring_period
            ).then(
                response => {
                  if (response.data === 'success') {
                    this.setState({
                      successful: true,
                      validationModal: true,
                      successMessage: "$"+  this.state.amount + " transaction successful"
                   });
                  }
                  else if(response.data === "error") {
                    this.setState({
                      successful: false,
                      validationModal: true,
                      successMessage: "$"+  this.state.amount + " transaction unsuccessful"
                    });
                  }
                  else if(response.data === "amount Incorrect") {
                    this.setState({
                      successful: false,
                      validationModal: true,
                      successMessage: "Transfer amount cannot be 0 or negative"
                    });
                  }
                  else if(response.data === "same accounts") {
                    this.setState({
                      successful: false,
                      validationModal: true,
                      successMessage: "Payee and Beneficiary are the same account numbers please check!"
                    });
                  }else if(response.data === "funds insufficient") {
                    this.setState({
                      successful: false,
                      validationModal: true,
                      successMessage: "not enough funds in sender account!"
                    });
                  }
                  window.setTimeout(() => {
                    this.props.history.push("/transfer");
                    window.location.reload();
                 }, 5000)
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
            ).catch(function (error) {
              console.log(error.response.data);
            })  
        }
    }
    render() {
        return (
          <div className="col-md-12">
            <div className="card card-container">
              <Form
                onSubmit={this.handleTransferFunds}
    
                ref={c => {
                  this.form = c;
                }}
              >
    
                {!this.state.successful && (
                  <div>
    
                    <div className="form-group">
                      <label htmlFor="payeeid">Your Account Number</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="payee_id"
                        value={this.state.payeeid}
                        onChange={this.onChangePayeeid}
                        validations={[required, payeeid]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="beneficiaryid">Beneficiary Account Number</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="beneficiaryid"
                        value={this.state.beneficiaryid}
                        onChange={this.onChangeBeneficiaryid}
                        validations={[required, beneficiaryid]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="amount">Amount</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="transaction_amount"
                        value={this.state.amount}
                        onChange={this.onChangeAmount}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="recurring_period">Recurring Period in months</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="recurring_period"
                        value={this.state.recurring_period}
                        onChange={this.onChangeRecurringPeriod}
                      />
                    </div>
    
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Transfer Funds</button>
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
            <Modal show={this.state.validationModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><b>Transfer Status</b></Modal.Title>
              </Modal.Header>
              <Modal.Body>{this.state.successMessage}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      }
}
