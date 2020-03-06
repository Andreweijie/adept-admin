import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import ASideBar from "./ASideBar";
import ADashboard from "./ADashboard";
import Jobs from "./Jobs";
import Customers from "./Customers";
import Create from "./Create";
import Enquiries from "./Enquiries";

export default class Admin extends Component {
  render() {
    return (
      <div id="admin">
        <ASideBar />
        <Route exact path="/admin/dashboard" component={ADashboard} />
        <Route
          exact
          path="/admin"
          render={() => {
            return <Redirect to="/admin/dashboard" />;
          }}
        />
        <Route exact path="/admin/all-jobs" component={Jobs} />
        <Route exact path="/admin/create" component={Create} />
        <Route exact path="/admin/customers" component={Customers} />
        <Route exact path="/admin/enquiries" component={Enquiries}></Route>
      </div>
    );
  }
}
