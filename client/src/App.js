import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './routes/login/login';
import { ToastContainer } from 'react-toastify';
import { Register } from './routes/register/register';
import { HomePage } from './routes/home-page/home-page';
import { CurrentUserContextProvider } from './hooks/useCurrentUser';
import {
  clubPath,
  dashboardPath,
  homePath,
  loginPath,
  registerPath,
  root,
} from './routes/constants';
import { LandingPage } from './routes/landing-page/landing-page';
import { Dashboard } from './routes/dashboard/dashboard';
import { Club } from './routes/club/club';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

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
    path: dashboardPath,
    element: <Dashboard />,
  },
  {
    path: `${clubPath}/:clubId`,
    element: <Club />,
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
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ToastContainer />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
