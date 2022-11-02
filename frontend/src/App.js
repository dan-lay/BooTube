import { Switch, Route, useLocation } from 'react-router-dom';
import UserLoginForm from './components/UserLoginForm';
import AccountRecoverForm from './components/AccountRecoverForm';
import LearnMorePage from './components/LearnMorePage';
import VideoIndexPage from './components/VideoIndexPage';
import UserSignupForm from './components/UserSignupForm';
import UploadVideoModal from './components/UploadVideoModal';
import VideoShowPage from './components/VideoShowPage';
import MastHead from './components/MastHead/Masthead';

function App() {
  const location = useLocation();
  
  return (
    <div className="app">
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <MastHead /> }
      <Switch>
        <Route exact path="/">
          <VideoIndexPage />
        </Route>
        <Route exact path="/login">
          <UserLoginForm />
        </Route>
        <Route exact path="/signup">
          <UserSignupForm />
        </Route>
        <Route exact path="/videos/:videoId">
          <VideoShowPage />
        </Route>
        <Route exact path="/upload">
          <UploadVideoModal />
        </Route>
        <Route path="/upload">
          <UploadVideoModal />
        </Route>
        <Route exact path="/recover">
          <AccountRecoverForm />
        </Route>
        <Route exact path="/learn_more">
          <LearnMorePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;