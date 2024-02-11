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
  manageClubsPath,
  clubPath,
  homePath,
  loginPath,
  registerPath,
  root,
  profilePath,
  landingPagePath,
} from './routes/constants';
import { LandingPage } from './routes/landing-page/landing-page';
import { Club } from './routes/club/club';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ErrorPage } from './components/error-page/error-page';
import { ErrorType } from './components/error-page/constants';
import { ApproveClubs } from './routes/approve-clubs/approve-clubs';
import { ManageClubs } from './routes/manage-clubs/manage-clubs';
import { Profile } from './routes/profile/profile';
import { Chat } from './routes/chat/chat';
import { PublicRoute } from './components/public-route/public-route';
import { PrivateRoute } from './components/private-route/private-route';

function App() {
  return (
    <div className='App'>
      <CurrentUserContextProvider>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path={root} element={<PublicRoute />}>
                <Route index element={<LandingPage />} />
                <Route path={loginPath} element={<Login />} />
                <Route path={registerPath} element={<Register />} />
              </Route>

              <Route path={root} element={<PrivateRoute />}>
                <Route path={landingPagePath} element={<LandingPage />} />
                <Route path={registerPath} element={<Register />} />
                <Route path={homePath} element={<BrowseClubs />} />
                <Route path={chatPath} element={<Chat />} />
                <Route path={profilePath} element={<Profile />} />
                <Route path={manageClubsPath}>
                  <Route index element={<ManageClubs />} />
                  <Route path={`${manageClubsPath}/:id`} element={<></>} />
                </Route>
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
