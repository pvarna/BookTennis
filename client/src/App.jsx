import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './routes/login/login';
import { ToastContainer } from 'react-toastify';
import { Register } from './routes/register/register';
import { BrowseClubs } from './routes/browse-clubs/browse-clubs';
import { CurrentUserContextProvider } from './hooks/useCurrentUser';
import {
  chatPath,
  clubsApprovalPath,
  createClubsPath,
  clubPath,
  homePath,
  loginPath,
  registerPath,
  root,
  profilePath,
} from './routes/constants';
import { LandingPage } from './routes/landing-page/landing-page';
import { Club } from './routes/club/club';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Layout } from './components/layout/layout';
import { ErrorPage } from './components/error-page/error-page';
import { ErrorType } from './components/error-page/constants';
import { ApproveClubs } from './routes/approve-clubs/approve-clubs';
import { CreateClub } from './routes/create-club/create-club';
import { Profile } from './routes/profile/profile';
import { Chat } from './routes/chat/chat';

function App() {
  return (
    <div className='App'>
      <CurrentUserContextProvider>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index path={root} element={<LandingPage />} />
                <Route path={loginPath} element={<Login />} />
                <Route path={registerPath} element={<Register />} />
                <Route path={homePath} element={<BrowseClubs />} />
                <Route path={chatPath} element={<Chat />} />
                <Route path={profilePath} element={<Profile />} />
                <Route path={createClubsPath} element={<CreateClub />} />
                <Route path={clubsApprovalPath} element={<ApproveClubs />} />
                <Route path={`${clubPath}/:clubId`} element={<Club />} />
              </Route>
              <Route
                path='*'
                element={<ErrorPage type={ErrorType.PageNotFound} />}
              />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
