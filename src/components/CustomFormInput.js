import React from "react";
import { Form } from 'react-bootstrap';

class CustomFormInput extends React.Component {
  render() {
    return (
      <Form.Group controlId={this.props.controlId}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onInputChange}
          value={this.props.value}
        />
      </Form.Group>
    );
  }
}

export default CustomFormInput;
