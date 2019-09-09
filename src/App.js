import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AuthUtils from "./components/auth/AuthUtils";
import Login from "./components/auth/Login";
import Alogin from "./components/admin/ALogin";
import ChangePassword from "./components/auth/ChangePassword";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import Admin from "./components/admin/Admin";
import Cust from "./components/customers/Cust";
import decode from "jwt-decode";
import config from "./config";
import "./scss/style.css";
import PrivateRoute from "./components/auth/PrivateRoute";

const auth = new AuthUtils();
class App extends Component {
  state = {
    loggedIn: auth.loggedIn()
  };
  componentDidMount() {
    //console.log(decode(localStorage.getItem("adeptcust_token")).user.custID);
    console.log(config.serverHost);
  }
  handleStatus = trueOrFalse => {
    console.log("changing");
    this.setState(
      {
        loggedIn: trueOrFalse
      },
      () => {
        console.log("changed");
      }
    );
  };
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => <Redirect to="/cust/dashboard" />}
        />
        <PrivateRoute path="/cust" component={Cust} />
        <Route path="/admin" component={Admin} />
        <Route exact path="/admins/login" component={Alogin} />
        <Route
          exact
          path="/customer/login"
          render={props => (
            <Login {...props} handleStatus={this.handleStatus} />
          )}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/change-password" component={ChangePassword} />
      </div>
    );
  }
}

export default withRouter(App);
