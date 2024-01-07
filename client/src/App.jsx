import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./routes/login/Login";
import { ToastContainer } from "react-toastify";
import { Register } from "./routes/register/Register";
import { HomePage } from "./routes/home-page/HomePage";
import { LandingPage } from "./routes/landing-page/LandingPage";
import { homePath, loginPath, registerPath, root } from "./routes/constants";


const router = createBrowserRouter([
  {
    path: root,
    element: <LandingPage />,
  },
  {
    path: loginPath,
    element: <Login />,
  },
  {
    path: registerPath,
    element: <Register />,
  },
  {
    path: homePath,
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
