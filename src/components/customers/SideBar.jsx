import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import decode from "jwt-decode";
import AuthUtils from "../auth/AuthUtils";

class SideBar extends Component {
  state = {
    name: decode(localStorage.getItem("adeptcust_token")).user.name
  };
  auth = new AuthUtils();
  logOut = () => {
    this.auth.logout();
    this.props.history.replace("/customer/login");
  };
  render() {
    return (
      <div className="side-bar">
        <img className="logo" src="https://i.imgur.com/UANNif7.png" />
        <div id="profile">
          <h1>Account Panel</h1>

          <span className="role">
            <span>
              <b>{this.state.name}</b>
            </span>
          </span>
        </div>
        <div className="nav">
          <Link to={`${this.props.match.url}/dashboard`}>Dashboard</Link>
          <Link to="/cust/history">Order History</Link>
          <Link to="/cust/change-password">Change Password</Link>
          <Link to="/cust/enquiry">Job Enquiry</Link>
          <button className="logout" onClick={this.logOut}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(SideBar);
