import React from "react";
import { Modal, Button } from "react-bootstrap";
import './ErrorModal.css';

class ErrorModal extends React.Component {
  state = { show: true };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <>
        <Modal
          className="modal"
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalMessage}</Modal.Title>
          </Modal.Header>
          <div className="text-center p-3">
            <Button variant="light" onClick={this.handleClose}>
              Ok
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ErrorModal;
