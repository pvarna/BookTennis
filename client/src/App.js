import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './routes/login/login';
import { ToastContainer } from 'react-toastify';
import { Register } from './routes/register/register';
import { HomePage } from './routes/home-page/home-page';
import { CurrentUserContextProvider } from './hooks/useCurrentUser';
import { homePath, loginPath, registerPath, root } from "./routes/constants";
import { LandingPage } from './routes/landing-page/landing-page';


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
    path:registerPath,
    element: <Register />,
  },
  {
    path: homePath,
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div className='App'>
      <CurrentUserContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
