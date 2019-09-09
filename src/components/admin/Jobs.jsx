import React, { Component } from "react";
import JobItem from "../utils/JobItem";
import config from "../../config";

export default class Jobs extends Component {
  state = {
    headers: [
      "Manufacturer",
      "Model No",
      "Serial No",
      "Fault Desc",
      "Job Status",
      "Job ID",
      "Entry Date",
      "Job Class",
      "Job Type",
      "Item Desc",
      "Closed Date",
      "Quote Amt",
      "Finished By",
      "Quote By",
      "Location",
      "Profit",
      "Salesperson",
      "Customer ID"
    ],
    body: [],
    loading: true
  };
  componentDidMount() {
    fetch(`${config.serverHost}/backend/admin/all-jobs`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          body: data.splice(1)
        });
      });
  }

  render() {
    return (
      <div className="all-jobs containers">
        <div className="head-title">
          <h1>All Jobs</h1>
          {this.state.body.length == 0 ? <div className="loader" /> : null}
        </div>
        <hr className="admin-hr" />
        <div className="all-box">
          <table className="table">
            <thead>
              {this.state.headers.map(header => {
                return <th>{header}</th>;
              })}
            </thead>

            {this.state.body
              ? this.state.body.map(e => {
                  return <JobItem data={Object.values(e)} />;
                })
              : null}
          </table>
        </div>
      </div>
    );
  }
}
