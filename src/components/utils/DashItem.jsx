import React, { Component } from "react";
import DashBodyItem from "./DashBodyItem";

export default class DashItem extends Component {
  render() {
    return (
      <div className="dash-item">
        <div className="dash-headers">
          {this.props.headers.map(header => {
            return <span className="dash-header">{header}</span>;
          })}
        </div>

        {this.props.body.map(item => {
          return (
            <DashBodyItem
              data={Object.values(item)}
              enquiry={this.props.enquiry}
            ></DashBodyItem>
          );
        })}
      </div>
    );
  }
}
