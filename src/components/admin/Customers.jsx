import React, { Component } from "react";
import config from "../../config";
import JobItem from "../utils/JobItem";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition
} from "griddle-react";

export default class Customers extends Component {
  state = {
    headers: [
      "Name",
      "Company",
      "Job Title",
      "Address",
      "Mobile Number",
      "Country",
      "Tel Number",
      "Fax Number"
    ],
    body: []
  };
  componentDidMount() {
    fetch(`${config.serverHost}/backend/admin/customers`)
      .then(res => res.json())
      .then(data => {
        if (data.length != 0) {
          this.setState({
            body: data
          });
        }
      });
  }

  render() {
    return (
      <div className="all-jobs containers">
        <div className="head-title">
          <h1>Customers</h1>
          {this.state.body.length == 0 ? <div className="loader" /> : null}
        </div>
        <hr className="admin-hr" />
        <div className="all-box">
          <Griddle
            data={this.state.body}
            plugins={[plugins.LocalPlugin]}
            pageProperties={{ pageSize: 30 }}
          >
            <RowDefinition>
              <ColumnDefinition id="id" title="id" order={1}></ColumnDefinition>
              <ColumnDefinition
                id="custName"
                title="Name"
                order={2}
              ></ColumnDefinition>
              <ColumnDefinition
                id="company"
                title="Company"
                order={3}
              ></ColumnDefinition>
              <ColumnDefinition
                id="jobTitle"
                title="Job Title"
                order={3}
              ></ColumnDefinition>
              <ColumnDefinition
                id="custAddress"
                title="Address"
                order={4}
              ></ColumnDefinition>
              <ColumnDefinition
                id="custPostCode"
                title="Mobile"
                order={5}
              ></ColumnDefinition>
              <ColumnDefinition
                id="custCountry"
                title="Country"
                order={6}
              ></ColumnDefinition>
              <ColumnDefinition
                id="custTel"
                title="Telephone"
                order={7}
              ></ColumnDefinition>
              <ColumnDefinition
                id="custFax"
                title="Fax Number"
                order={8}
              ></ColumnDefinition>
            </RowDefinition>
          </Griddle>
        </div>
      </div>
    );
  }
}
