import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "./routes/login/login";
import { ToastContainer } from "react-toastify";
import { HomePage } from "./routes/home-page/home-page";
import { CurrentUserContextProvider } from "./hooks/useCurrentUser";
import {
  chatPath,
  clubsApprovalPath,
  createClubsPath,
  homePath,
  loginPath,
  profilePath,
  registerPath,
  root,
} from "./routes/constants";
import { LandingPage } from "./routes/landing-page/landing-page";
import { Chat } from "./routes/chat/chat";
import { Register } from "./routes/register/register";
import { Profile } from "./routes/profile/profile";
import { CreateClub } from "./routes/create-club/create-club";
import { ApproveClubs } from "./routes/approve-clubs/approve-clubs";
import { Layout } from "./components/layout/layout";
import { ErrorPage } from "./components/error-page/error-page";
import { ErrorType } from "./components/error-page/constants";


function App() {
  return (
    <div className="App">
      <CurrentUserContextProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path={root} element={<LandingPage />} />
              <Route path={loginPath} element={<Login />} />
              <Route path={registerPath} element={<Register />} />
              <Route path={homePath} element={<HomePage />} />
              <Route path={chatPath} element={<Chat />} />
              <Route path={profilePath} element={<Profile />} />
              <Route path={createClubsPath} element={<CreateClub />} />
              <Route path={clubsApprovalPath} element={<ApproveClubs />} />
            </Route>
            <Route path='*' element={<ErrorPage type={ErrorType.PageNotFound} />}/>
          </Routes>
        </BrowserRouter>
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
