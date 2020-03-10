import React, { Component } from "react";
import config from "../../config";
import JobItem from "../utils/JobItem";
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition
} from "griddle-react";
import DashItem from "../utils/DashItem";

export default class Customers extends Component {
  state = {
    headers: [
      "Manufacturer",
      "Model",
      "Serial",
      "Fault",
      "Job Class",
      "Item",
      "Date",
      "ID"
    ],
    body: []
  };
  componentDidMount() {
    fetch(`${config.serverHost}/backend/admin/enquiries`)
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
      <div className="all-jobs containers enquiries">
        <div className="all-box">
          <div className="pickup">
            <h1>Enquiries</h1>
            <DashItem
              headers={this.state.headers}
              body={this.state.body}
              enquiry={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
