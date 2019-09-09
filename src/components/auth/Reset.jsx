import React, { Component } from "react";
import config from "../../config";
import { message } from "flwww";
class Reset extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    fetch(`${config.serverHost}/backend/api/forget?email=${this.state.email}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          message(
            "An e-mail has been sent with the instructions to reset your password",
            "success",
            6
          );
        }
      });
  };
  render() {
    return (
      <div className="login-page">
        <div id="back-box">
          <img className="logo" src="https://i.imgur.com/UANNif7.png" />
          <p id="welcome">
            Reset your Adept Account <b>password</b>
          </p>
          <div id="login-box">
            <h4>
              <b>Reset Below</b>
            </h4>
            <form className="form-box" onSubmit={this.onSubmit}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
              </div>
              <div />
            </form>
            <button type="submit" onClick={this.onSubmit}>
              RESET
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Reset;
