import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CreateBook from "./components/CreateBook.jsx";
import EditBook from "./components/EditBook.jsx";
import "./index.css";

const baseUrl = "cm7l0hm5-3000.asse.devtunnels.ms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App baseUrl={baseUrl} />,
    children: [
      {
        path: "/create",
        element: <CreateBook baseUrl={baseUrl} />,
      },
      {
        path: "/edit",
        element: <EditBook baseUrl={baseUrl} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
