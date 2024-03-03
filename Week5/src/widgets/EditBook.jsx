import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditBook = ({ books, bookId }) => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(3);
  let foundBook = books.find((book) => book.id === bookId);
  const [title, setTitle] = useState(foundBook.title);
  const [author, setAuthor] = useState(foundBook.author);
  const [description, setDescription] = useState(foundBook.description);

  const handleSaveChanges = () => {
    // Simulate updating the book's information
    foundBook = { id: bookId, title, author, rating: parseInt(rating), description };
    console.log(foundBook); // Here you could call onUpdate(updatedBook) to update the book in your app's state or database
    setShow(false); // Close the modal after saving changes
  };

  const renderStars = (value) => {
    return "⭐".repeat(value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Dirty Vote"
                defaultValue={foundBook.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="ex: Ga An Wo"
                defaultValue={foundBook.author}
                onChange={(e) => setAuthor(e.target.value)}
              />
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
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={foundBook.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBook;
