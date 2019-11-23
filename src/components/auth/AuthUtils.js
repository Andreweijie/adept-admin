import decode from "jwt-decode";
import { Component } from "react";

export default class AuthUtils extends Component {
  constructor() {
    super();
  }

  loggedIn = () => {
    const token = this.getAdminToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  setToken = (token, type) => {
    localStorage.setItem(type, token);
  };

  getCustToken = () => {
    return localStorage.getItem("adeptcust_token");
  };

  getAdminToken = () => {
    return localStorage.getItem("adeptadmin_token");
  };

  getCustID = () => {
    return decode(localStorage.getItem("adeptcust_token")).user.custID;
  };
  adminLogOut = () => {
    localStorage.removeItem("adeptadmin_token");
  };
  logout = () => {
    localStorage.removeItem("adeptcust_token");
  };

  _checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
