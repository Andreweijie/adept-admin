import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthUtils from "../auth/AuthUtils";

class ASideBar extends Component {
  auth = new AuthUtils();
  logOut = () => {
    this.auth.adminLogOut();
    this.props.history.replace("/admins/login");
  };
  render() {
    return (
      <div id="admin-side">
        <img className="logo" src="https://i.imgur.com/sW8kLFw.png" />
        <div id="profile">
          <h1>Admin Account</h1>
          <span className="role">
            <span>
              Admin | <b>Sales</b>
            </span>
          </span>
        </div>
        <div className="nav">
          <Link to={`${this.props.match.url}/dashboard`}>Dashboard</Link>
          <Link to="/admin/all-jobs">All Jobs</Link>
          <Link to="/admin/customers">Customers</Link>
          <button className="logout" onClick={this.logOut}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(ASideBar);
