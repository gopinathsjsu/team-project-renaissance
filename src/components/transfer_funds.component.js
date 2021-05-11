import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import TransferService from "../services/transfer-funds.service";
import AccountService from "../services/transfer-funds.service";
// import Select from 'react-select';
// import { render } from "@testing-library/react";

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

export default class TransferFunds extends Component {
    constructor(props) {
        super(props);
        this.handleTransferFunds = this.handleTransferFunds.bind(this);
        this.onChangePayeeid = this.onChangePayeeid.bind(this);
        this.onChangeBeneficiaryid = this.onChangeBeneficiaryid.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);

        this.state = {
          payeeid: "",
          beneficiaryid: "",
          amount:""  
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
                this.state.amount
            ).then(
                response => {
                    this.setState({
                      successful: true,
                      message: resSuccMessg
                    });
                    this.props.history.push("/transfer");

                    window.location.reload();
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
          </div>
        );
      }
}
