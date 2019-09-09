import React, { Component } from "react";
import { message } from "flwww";
import Tables from "../utils/Tables";
import config from "../../config";

export default class ADashboard extends Component {
  state = {
    custID: 0,
    email: "",
    enquiryId: "",
    quote: 0,
    jobid: "",
    status: "",
    headers: [
      "Date",
      "Customer ID",
      "Job ID",
      "Address",
      "Email",
      "Company",
      "Contact No"
    ],
    body: []
  };

  componentDidMount() {
    this.getPickups();
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  postNewData = (newData, endpoint, msg, update) => {
    fetch(`${config.serverHost}/backend/admin/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(data => {
        message(msg, "success");
        console.log(data);
        this.setState(update);
      });
  };

  linkCustomer = e => {
    e.preventDefault();
    const newLink = {
      email: this.state.email,
      custID: this.state.custID
    };
    const update = { email: "", custID: 0 };
    this.postNewData(newLink, "link-customer", "Account Linked!", update);
  };
  changeStatus = e => {
    e.preventDefault();
    const newJobStatus = {
      jobId: this.state.jobid,
      status: this.state.status
    };
    const update = { jobid: "", status: "" };
    this.postNewData(
      newJobStatus,
      "change-status",
      "Job Status Changed",
      update
    );
  };

  confirmOrder = e => {
    e.preventDefault();
    const confirmData = {
      enquiryId: this.state.enquiryId,
      quote: this.state.quote
    };
    const newUpdate = {
      enquiryId: "",
      quote: 0
    };
    this.postNewData(confirmData, "confirm", "Job Confirmed!", newUpdate);
  };

  getPickups = () => {
    fetch(`${config.serverHost}/backend/admin/pickups`)
      .then(res => res.json())
      .then(data => {
        if (data.length != 0) {
          this.setState({
            body: data
          });
        }
      });
  };
  render() {
    return (
      <div id="a-dash">
        <h1>Dashboard</h1>
        <div className="dash-content">
          <div className="forms">
            <div className="confirm-form">
              <p>Confirm Job</p>
              <form>
                <div className="input-box">
                  <label htmlFor="enquiryId">Enquiry ID</label>
                  <input
                    onChange={this.onChange}
                    id="enquiryId"
                    type="text"
                    value={this.state.enquiryId}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="quote">Quote</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    id="quote"
                    value={this.state.quote}
                  />
                </div>
                <button onClick={this.confirmOrder}>SUBMIT</button>
              </form>
            </div>
            <div className="change-form">
              <p>Change Job Status</p>
              <form>
                <div className="input-box">
                  <label htmlFor="jobid">Job ID</label>
                  <input
                    onChange={this.onChange}
                    id="jobid"
                    type="text"
                    value={this.state.jobid}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="status">Job Status</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    id="status"
                    value={this.state.status}
                  />
                </div>

                <button onClick={this.changeStatus}>SUBMIT</button>
              </form>
            </div>
            <div className="link-form">
              <p>Link Customer ID</p>
              <form>
                <div className="input-box">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.onChange}
                    id="email"
                    type="text"
                    value={this.state.email}
                  />
                </div>
                <div className="input-box">
                  <label htmlFor="status">Customer ID</label>
                  <input
                    onChange={this.onChange}
                    type="text"
                    id="custID"
                    value={this.state.custID}
                  />
                </div>

                <button onClick={this.linkCustomer}>SUBMIT</button>
              </form>
            </div>
          </div>
          <div className="pickup">
            <h1>Pickups</h1>
            <Tables headers={this.state.headers} body={this.state.body} />
          </div>
        </div>
      </div>
    );
  }
}
