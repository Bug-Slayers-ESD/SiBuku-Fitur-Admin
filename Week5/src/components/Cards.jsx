import React, { useState, useEffect } from "react";
import EditBook from "../widgets/EditBook";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const Cards = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <>
      {books.map((book) => (
        <Col key={book.id}>
          <Card className="mb-4">
            <Card.Img
              variant="top"
              src={book.cover_image}
              alt={`Cover of the book ${book.title}`}
              className="img-fluid"
            />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
              <Card.Text>{book.description}</Card.Text>
              <EditBook books={books} bookId={book.id} />
              <Button variant="danger" className="ms-2" onClick={() => deleteBook(book.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default Cards;
