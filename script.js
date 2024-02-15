const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  fetchBooks();
  document.getElementById("newBookForm").addEventListener("submit", addNewBook);
});

function fetchBooks() {
  fetch(`${baseUrl}/books`)
    .then((response) => response.json())
    .then((data) => displayBooks(data.booklist))
    .catch((error) => console.error("Error:", error));
}

function editBook(bookId) {
  fetch(`${baseUrl}/books`)
    .then((response) => response.json())
    .then((data) => {
      let chosenBook = data.booklist.find((book) => book.id === bookId);
      document.getElementById("editTitle").value = chosenBook.title;
      document.getElementById("editDescription").value = chosenBook.description;
      document.getElementById("editAuthor").value = chosenBook.author;
      document.getElementById("editRating").value = chosenBook.rating;
      // Note: Handling file edit can be complex as you need to manage existing file
      document.getElementById("editBookModal").style.display = "block";

      document
        .getElementById("editBookForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          const formData = new FormData();
          formData.append("title", document.getElementById("editTitle").value);
          formData.append(
            "description",
            document.getElementById("editDescription").value
          );
          formData.append(
            "author",
            document.getElementById("editAuthor").value
          );
          formData.append(
            "rating",
            document.getElementById("editRating").value
          );
          const editImage = document.getElementById("editImage").files[0];
          if (editImage) {
            formData.append("image", editImage);
          }
          fetch(`${baseUrl}/books/${chosenBook.id}`, {
            method: "PUT",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Update Success:", data);
              closeEditModal();
              fetchBooks(); // Refresh daftar buku
            })
            .catch((error) => console.error("Error:", error));
        });
    });
}

function displayBooks(books) {
  const container = document.getElementById("books");
  container.innerHTML = "";
  books.forEach((book) => {
    container.innerHTML += `
    <br></br>
    <br></br>
    <div>
    <h3>${book.title}</h3>
    <img src="${baseUrl}${book.image}" alt="${book.title}" style="width:200px;">
    <p>Author: ${book.author}</p>
    <p>Rating: ${book.rating}/5</p>
    <p>${book.description}</p>
    <button onclick="editBook('${book.id}')">Edit</button>
    <button onclick="deleteBook('${book.id}')">Delete</button>
    </div>
    `;
  });
}

function addNewBook(event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("title", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("author", document.getElementById("author").value);
  formData.append("rating", document.getElementById("rating").value);
  formData.append("image", document.getElementById("image").files[0]);

  fetch(`${baseUrl}/books`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      fetchBooks();
    })
    .catch((error) => console.error("Error:", error));
}

function deleteBook(bookId) {
  fetch(`http://localhost:3000/books/${bookId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Delete Success:", data);
      fetchBooks(); // Refresh daftar buku
    })
    .catch((error) => console.error("Error:", error));
}

function closeEditModal() {
  document.getElementById("editBookModal").style.display = "none";
}

document.getElementsByClassName("close")[0].onclick = function () {
  document.getElementById("editBookModal").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("editBookModal")) {
    document.getElementById("editBookModal").style.display = "none";
  }
};
