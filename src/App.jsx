import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
