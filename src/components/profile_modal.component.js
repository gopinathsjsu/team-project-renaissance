import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import {
  Button,
  Modal
} from "react-bootstrap";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
    if (!isEmail(value)) {
        return (
        <div className="alert alert-danger" role="alert">
            This is not a valid email.
        </div>
        );
    }
};

const vfirstname = value => {
	if (value.length < 3 || value.length > 20) {
			return (
			<div className="alert alert-danger" role="alert">
					The firstname must be between 3 and 20 characters.
			</div>
			);
	}
};

const vlastname = value => {
	if (value.length < 3 || value.length > 20) {
			return (
			<div className="alert alert-danger" role="alert">
					The lastname must be between 3 and 20 characters.
			</div>
			);
	}
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
        <div className="alert alert-danger" role="alert">
            The username must be between 3 and 20 characters.
        </div>
        );
    }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangefirstname = this.onChangefirstname.bind(this);
		this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);

    this.state = {
      username: "",
      first_name: "",
			last_name: "",
      email: "",
      password: "",
      address: "",
      contact: "",
      successful: false,
      message: "",
			showModal: false
    };
  }

	onChangefirstname(e) {
    this.setState({
      first_name: e.target.value
    });
  }

	onChangelastname(e) {
    this.setState({
      last_name: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeContactNumber(e) {
    this.setState({
      contact: e.target.value
    });
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleUpdate(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.update(
        this.state.username,
        this.state.address,
        this.state.contact,
        this.state.first_name,
				this.state.last_name,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
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

	renderUpdateForm() {
		return (
			<>
			<div className="card card-container">
				<Form
					onSubmit={this.handleUpdate}
					ref={c => {
					this.form = c;
					}}
				>
					{!this.state.successful && (
						<div>
							<div className="form-group">
								<label htmlFor="first_name">First Name</label>
								<Input
									type="text"
									className="form-control"
									name="first_name"
									value={this.state.first_name}
									onChange={this.onChangefirstname}
									validations={[required, vfirstname]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="last_name">Last Name</label>
								<Input
									type="text"
									className="form-control"
									name="last_name"
									value={this.state.last_name}
									onChange={this.onChangelastname}
									validations={[required, vlastname]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="username">Userame</label>
								<Input
									type="text"
									className="form-control"
									name="username"
									value={this.state.username}
									onChange={this.onChangeUsername}
									validations={[required, vusername]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="address">Address</label>
								<Input
									type="text"
									className="form-control"
									name="address"
									value={this.state.address}
									onChange={this.onChangeAddress}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="cell">Phone Number</label>
								<Input
									type="tel"
									className="form-control"
									name="contact"
									value={this.state.contact}
									onChange={this.onChangeContactNumber}
									validations={[required]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email</label>
								<Input
									type="text"
									className="form-control"
									name="email"
									value={this.state.email}
									onChange={this.onChangeEmail}
									validations={[required, email]}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<Input
									type="password"
									className="form-control"
									name="password"
									value={this.state.password}
									onChange={this.onChangePassword}
									validations={[required, vpassword]}
								/>
							</div>
							<div className="form-group">
								<button className="btn btn-primary btn-block">Submit</button>
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
			</>
		);
	}

  render() {
    return (
			<div>
				<Modal
					show={this.props.showModal}
					onHide={this.props.onClose}
					onSubmit={this.onSubmit}
					bsSize="large"
				>
					<Modal.Header closeButton={true}>
						<h2>Update Profile</h2>
					</Modal.Header>
					<Modal.Body>
						{this.renderUpdateForm()}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.props.onClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

