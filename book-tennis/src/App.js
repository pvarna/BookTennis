import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./routes/login/Login";
import { ToastContainer } from "react-toastify";
import { Register } from "./routes/register/Register";
import { HomePage } from "./routes/home-page/HomePage";
import { Profile } from "./routes/profile/Profile";

const router = createBrowserRouter([
  {
    //TODO: change this to homepage and add a new route for login
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
