import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Cards = ({ baseUrl }) => {
  const [deletingBookId, setDeletingBookId] = useState(null);
  const [books, setBooks] = useState([]);
  const location = useLocation();

  function fetchBooks() {
    fetch(`https://${baseUrl}/books`)
      .then((res) => res.json())
      .then(({ data }) => setBooks(data))
      .catch((err) => console.log(err));
  }

  function bufferToUrl(buffer, imgType) {
    const blob = new Blob([new Uint8Array(buffer)], { type: imgType });
    return URL.createObjectURL(blob);
  }

  function convertRating(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "⭐";
    }
    return stars;
  }

  function removeBook(bookId) {
    setDeletingBookId(bookId);
    fetch(`https://${baseUrl}/books/${bookId}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the book");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Book deleted successfully", data);
        fetchBooks();
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => {
        setDeletingBookId(null); // Reset the deletingBookId after deletion process finishes
      });
  }

  useEffect(() => {
    fetchBooks();

    if (location.state?.bookChanged) {
      fetchBooks();
    }
  }, [location.state]);

  return (
    <div className="grid pb-10 gap-10 grid-cols-1 mt-10 text-center xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <div key={book.id} className="flex gap-y-5 flex-col items-center rounded-lg text-sm bg-white p-5">
          <img
            src={bufferToUrl(book.image.data, book.image.type)}
            alt="imagenya lagi ngebug 😁🙏"
            className="h-40"
          />
          <h1 className="font-bold mt-5">{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>{convertRating(book.rating)}</p>
          <p className="break-all">{book.description}</p>

          <div className="flex items-center mt-auto self-end">
            <button onClick={() => removeBook(book.id)} className="p-2 bg-red-500 text-white rounded mr-3">
              {deletingBookId === book.id ? "Deleting..." : "Delete"}
            </button>
            <Link to="/edit" state={{ book }} className="py-2 px-4 bg-blue-500 text-white rounded">
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
