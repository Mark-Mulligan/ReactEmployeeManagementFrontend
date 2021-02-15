import React from "react";
import { Form } from "react-bootstrap";

class CustomFormSelect extends React.Component {
  render() {
    return (
      <Form.Group controlId={this.props.controlId}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          as={this.props.type}
          onChange={this.props.onSelectChange}
          value={this.props.value}
        >
          <option hidden>{this.props.placeholder}</option>
          {this.props.options}
        </Form.Control>
      </Form.Group>
    );
  }
}

export default CustomFormSelect;
