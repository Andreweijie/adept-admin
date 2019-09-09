import React, { Component } from "react";
import config from "../../config";
import decode from "jwt-decode";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      otp: "",
      password: "",
      password2: "",
      custOrNot: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem("adeptcust_token")) {
      this.setState({ custOrNot: true });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    let newPassword = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      custID: undefined
    };
    if (this.state.custOrNot) {
      newPassword.custID = true;
    } else {
      newPassword.otp = this.state.otp;
    }
    fetch(`${config.serverHost}/backend/api/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPassword)
    })
      .then(response => response.json())
      .then(data => {
        if (this.state.custOrNot) {
          localStorage.removeItem("adeptcust_token");
          this.props.history.replace("/customer/login");
        } else {
          this.props.history.replace("/customer/login");
        }
      });
  };

  render() {
    return (
      <div className="change-page">
        <div id="change-box">
          <h4>
            <b>Change Password</b>
          </h4>
          <form className="form-box" noValidate onSubmit={this.onSubmit}>
            {!this.state.custOrNot ? (
              <div className="input-field">
                <label htmlFor="otp">One Time Password</label>
                <input
                  onChange={this.onChange}
                  value={this.state.otp}
                  id="otp"
                  type="text"
                />
              </div>
            ) : null}
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password2">New Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                id="password2"
                type="password"
              />
            </div>
            <div />
          </form>
          <button type="submit" onClick={this.onSubmit}>
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
