import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const EditDeleteGroup = (props) => {
  return (
    <div className="mt-3">
          <Row>
            <Col className="text-right">
              <Button
                className="fixed-width-btn"
                as={Link}
                to={props.linkTo}
                variant="light"
              >
                Edit
              </Button>
            </Col>
            <Col className="text-left">
              <DeleteModal
                modalMessage={props.modalMessage}
                handleDeleteClick={props.handleDeleteClick}
              />
            </Col>
          </Row>
        </div>
  )
}

export default EditDeleteGroup;