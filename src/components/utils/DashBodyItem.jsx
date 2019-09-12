import React, { Component } from "react";
import { Modal, Button } from "flwww";

export default class DashBodyItem extends Component {
  state = {
    modalIsVisible: false
  };
  toggleModal = () => {
    this.setState({
      modalIsVisible: !this.state.modalIsVisible
    });
  };
  render() {
    const { modalIsVisible } = this.state;
    return (
      <div className="dash-body-items" onClick={this.toggleModal}>
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
            return <span className="dash-header">{header}</span>;
          } else {
            return <span className="dash-header child">{header}</span>;
          }
        })}
      </div>
    );
  }
}
