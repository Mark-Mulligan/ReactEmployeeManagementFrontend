import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class DeleteModal extends React.Component {
  state = { show: false }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
      <Button className="mr-2" variant="secondary" onClick={this.handleShow}>
        Delete
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalMessage}</Modal.Title>
        </Modal.Header>
        <div className="text-center p-3">
          <Button className="mr-4" variant="danger" onClick={this.props.handleDeleteClick}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
    )
  }
}

export default DeleteModal;