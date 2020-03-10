import React, { Component } from "react";
import { Modal, Button, message } from "flwww";
import config from "../../config";
export default class DashBodyItem extends Component {
  state = {
    modalIsVisible: false
  };
  toggleModal = () => {
    this.setState({
      modalIsVisible: !this.state.modalIsVisible,
      show: true
    });
  };
  cancelPending = () => {
    alert("canceling");
    fetch(
      `${config.serverHost}/backend/admin/cancel-pending?enquiryId=${this.props.data[7]}`,
      {
        method: "DELETE"
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          message("Pending Job deleted", "success", 4);
        } else {
          alert("failed");
        }
      });
  };
  render() {
    const { modalIsVisible } = this.state;
    return (
      <div className="dash-body-items">
        <Modal
          title="PICKUP"
          isVisible={modalIsVisible}
          toggleModal={this.toggleModal}
        >
          <div className="modal-item">
            {this.props.data.map(header => {
              return <span>{header}</span>;
            })}
          </div>
        </Modal>
        {this.props.data.map((header, index) => {
          if (index == 0 || index == 1) {
            return (
              <span key={index} className="dash-header">
                {header}
              </span>
            );
          } else {
            return (
              <span key={index} className="dash-header child">
                {header}
              </span>
            );
          }
        })}
        {this.props.enquiry ? (
          <span className="cancel-btn">
            <button onClick={this.cancelPending}>cancel</button>
          </span>
        ) : null}
      </div>
    );
  }
}
