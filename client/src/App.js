import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './routes/login/login';
import { ToastContainer } from 'react-toastify';
import { HomePage } from './routes/home-page/home-page';
import { CurrentUserContextProvider } from './hooks/useCurrentUser';
import { chatPath, clubsApprovalPath, createClubsPath, homePath, loginPath, profilePath, registerPath, root } from "./routes/constants";
import { LandingPage } from './routes/landing-page/landing-page';
import { Chat } from './routes/chat/chat';
import { Register } from './routes/register/register';
import { Profile } from './routes/profile/profile';
import { CreateClub } from './routes/create-club/create-club';
import { ApproveClubs } from './routes/approve-clubs/approve-clubs';

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
  {
    path: chatPath,
    element: <Chat/>
  },
  {
    path: profilePath,
    element: <Profile/>
  },
  {
    path: createClubsPath,
    element: <CreateClub/>
  },
  {
    path: clubsApprovalPath,
    element: <ApproveClubs/>
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
