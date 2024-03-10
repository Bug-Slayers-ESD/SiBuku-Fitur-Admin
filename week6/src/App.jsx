import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import { Link, Outlet } from "react-router-dom";

function App(props) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen px-5">
      <Navbar />
      <Link to="/create" className="p-2 bg-blue-500 text-white rounded">
        Create Book
      </Link>
      <Cards baseUrl={props.baseUrl} />
      <Outlet />
    </div>
  );
}

export default App;
