import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const EditBook = ({ baseUrl }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [invalidImage, setInvalidImage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id, title, author, rating, description } = location.state.book || {};

  const [form, setForm] = useState({ image: "", title, author, rating, description });
  console.log(form);

  function handleSubmit(e) {
    e.preventDefault();
    if (isSaving) return;
    if (!["image/png", "image/jpeg", "image/jpg"].includes(form.image.type)) {
      setInvalidImage(true);
      return;
    }
    setIsSaving(true);
    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("rating", form.rating);
    formData.append("description", form.description);

    fetch(`https://${baseUrl}/books/${id}`, { method: "PUT", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to edit the book");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Book edited successfully", data);
        navigate("/", { state: { bookChanged: true } });
      })
      .catch((err) => {
        console.error("Error:", err);
      })
      .finally(() => setIsSaving(false));
  }
  useEffect(() => {
    document.body.classList.add("scrollable");
    return () => document.body.classList.remove("scrollable");
  }, []);

  return (
    <div
      className="flex justify-center items-center fixed backdrop-blur-[3px] w-screen h-screen z-50 px-2"
      onClick={() => navigate("/")}
    >
      <div
        className="flex-col justify-center items-center p-5 bg-white rounded w-96 mx-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Create Book</h1>
          <img
            className="cursor-pointer"
            src="https://img.icons8.com/ios-filled/20/delete-sign--v1.png"
            alt="Close Btn"
            onClick={() => navigate("/")}
          />
        </div>
        <form id="editForm" onSubmit={handleSubmit} className="flex flex-col gap-3 my-3">
          <input
            name="image"
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded"
            required
          />
          {invalidImage && (
            <label className="text-sm text-red-500">
              Masukkan file berformat image! (.jpg / .png / .jpeg)
            </label>
          )}
          <input
            name="title"
            type="text"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            value={form.title}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="author"
            type="text"
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            value={form.author}
            placeholder="Author"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            name="rating"
            type="number"
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            value={form.rating}
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="description"
            rows="6"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            value={form.description}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded"
            required
          />
        </form>
        <div className="flex justify-end gap-x-3">
          <button className="flex p-2 bg-red-500 text-white rounded" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button form="editForm" type="submit" className="flex p-2 bg-blue-500 text-white rounded">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
