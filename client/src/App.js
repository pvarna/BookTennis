import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './routes/login/login';
import { ToastContainer } from 'react-toastify';
import { Register } from './routes/register/register';
import { HomePage } from './routes/home-page/home-page';
import { CurrentUserContextProvider } from './hooks/useCurrentUser';
import { Dashboard } from './routes/dashboard/dashboard';
import { Club } from './routes/club/club';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

export const ROUTES = {
  home: '/',
  login: 'login',
  register: 'register',
  dashboard: 'dashboard',
  club: 'club',
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
    path: ROUTES.dashboard,
    element: <Dashboard />,
  },
  {
    path: `${ROUTES.club}/:clubId`,
    element: <Club />,
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
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ToastContainer />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
