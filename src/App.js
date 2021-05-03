import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import AdminPage from "./components/admin_page.component";
import AdminLogin from "./components/admin_login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import CreateAccount from "./components/createAccount.component";
import TransferFunds from "./components/transfer_funds.component";

// Profile pages
import UserPage from "./components/user_page.component";
import UserProfile from "./components/profile_page.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getLoggedInUser();

    if (user) {
      this.setState({
        loggedInUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { loggedInUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            app
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {loggedInUser && (
              <li className="nav-item">
                
              </li>
            )}
          </div>

          {loggedInUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {loggedInUser.username}
                </Link>
              </li>
              {loggedInUser.role === 2 ? (
                <li className="nav-item">
                  <Link to={"/createAccount"} className="nav-link">
                    Create Account
                  </Link>
                </li>
              ):(
                <p />
              )}
              {loggedInUser.role == 2 ? (
                <li className="nav-item">
                  <Link to={"/transfer"} className="nav-link">
                    Transfer Funds
                  </Link>
                </li>
              ):(
                <p />
              )}
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/adminlogin"} className="nav-link">
                  Admin Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/profile" component={UserProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/adminlogin" component={AdminLogin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/createAccount" component={CreateAccount} />
            <Route exact path="/transfer" component={TransferFunds} />
            {/* <Route path="/user" component={UserPage} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
