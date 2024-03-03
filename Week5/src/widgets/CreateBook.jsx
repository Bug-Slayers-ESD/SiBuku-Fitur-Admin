import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CreateBook = () => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(3);

  const renderStars = (value) => {
    return "⭐".repeat(value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex align-items-center justify-content-center my-5">
      <Button variant="info" onClick={handleShow}>
        Create Book
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="ex: Dirty Vote" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="ex: Ga An Wo" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating ({renderStars(rating)})</Form.Label>
              <Form.Range
                min="1"
                max="5"
                value={rating} // Set the value to the state
                onChange={(e) => setRating(e.target.value)} // Update the state on change
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateBook;
