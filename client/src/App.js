import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './routes/login/login';
import { ToastContainer } from 'react-toastify';
import { Register } from './routes/register/register';
import { HomePage } from './routes/home-page/home-page';
import { CurrentUserContextProvider } from './hooks/useCurrentUser';

export const ROUTES = {
  home: '/',
  login: '/login',
  register: 'register',
};

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: '*',
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
