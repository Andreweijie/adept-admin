import React, { Component } from "react";
import { Route } from "react-router-dom";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import History from "./History";
import Enquiry from "./Enquiry";
import ChangePassword from "../auth/ChangePassword";

export default class Cust extends Component {
  render() {
    return (
      <div id="cust">
        <SideBar />
        <Route
          path={`${this.props.match.url}/dashboard`}
          component={Dashboard}
        />
        <Route path="/cust/enquiry" component={Enquiry} />
        <Route path="/cust/history" component={History} />
        <Route path="/cust/change-password" component={ChangePassword} />
      </div>
    );
  }
}
