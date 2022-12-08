import { Switch, Route, useLocation } from 'react-router-dom';
import UserLoginForm from './components/UserLoginForm/UserLoginForm';
import AccountRecoverForm from './components/AccountRecoverForm/AccountRecoverForm';
import LearnMorePage from './components/LearnMorePage/LearnMorePage';
import VideoIndexPage from './components/VideoIndexPage/VideoIndexPage';
import UserSignupForm from './components/UserSignupForm/UserSignupForm';
import UploadVideoModal from './components/UploadVideoModal/UploadVideoModal';
import VideoShowPage from './components/VideoShowPage/VideoShowPage';
import MastHead from './components/MastHead/MastHead.js';

function App() {
  const location = useLocation();
  
  return (
    <div className="app">
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