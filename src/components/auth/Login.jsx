import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthUtils from "./AuthUtils";
import config from "../../config";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: { email: "", password: "" }
    };
    this.auth = new AuthUtils();
  }
  componentDidMount() {
    if (this.auth.loggedIn()) {
      console.log("loggedin");
      this.props.history.replace("/cust/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      accountType: "customer"
    };
    fetch(`${config.serverHost}/backend/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          this.setState({ errors: data.errors }, () =>
            console.log(this.state.errors)
          );
        } else {
          console.log("loggedin");
          this.auth.setToken(data.adeptcust_token, "adeptcust_token");
          this.props.history.replace("/cust/dashboard");
        }
      });
  };
  render() {
    return (
      <div className="login-page">
        <div id="back-box">
          <p id="welcome">
            Welcome to your <b>Adept Account</b>
          </p>
          <p id="reg-text">
            Don't have an account?{" "}
            <Link to="/register">
              <b className="reg-link">Register Here!</b>
            </Link>
          </p>
          <div id="login-box">
            <h4>
              <b>Login Below</b>
            </h4>
            <form className="form-box" onSubmit={this.onSubmit}>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                {this.state.errors.email ? (
                  <label className="error" htmlFor="email">
                    E-mail Does not Exist
                  </label>
                ) : null}
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                {this.state.errors.password ? (
                  <label className="error" htmlFor="password">
                    {this.state.errors.password}
                  </label>
                ) : null}
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                />
              </div>
              <div />
            </form>
            <button type="submit" onClick={this.onSubmit}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
