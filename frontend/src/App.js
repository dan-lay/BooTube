import { Switch, Route, useLocation } from 'react-router-dom';
import UserLoginForm from './components/UserLoginForm/UserLoginForm';
import AccountRecoverForm from './components/AccountRecoverForm/AccountRecoverForm';
import LearnMorePage from './components/LearnMorePage/LearnMorePage';
import VideoIndexPage from './components/VideoIndexPage/VideoIndexPage';
import UserSignupForm from './components/UserSignupForm/UserSignupForm';
import VideoShowPage from './components/VideoShowPage/VideoShowPage';
import UserChannelPage from './components/UserChannelPage/UserChannelPage';
import TopBar from './components/TopBar/TopBar';
import UploadVideoModal from './components/UploadVideoModal/UploadVideoModal';
import { useState } from 'react';

const App = () => {
  const location = useLocation();
  const topBarVisible = location.pathname !== "/login" && location.pathname !== "/signup";

  const [ revealUpload, setRevealUpload ] = useState(false);
  
  return (
    <div className="app">
      {topBarVisible && <TopBar setRevealUpload={setRevealUpload} revealUpload={revealUpload}/>}

      <div className='main-content'>
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
          <Route exact path="/videos/:id">
            <VideoShowPage />
          </Route>
          <Route exact path="/:handle">
            <UserChannelPage />
          </Route>
          <Route exact path="/recover">
            <AccountRecoverForm />
          </Route>
          <Route exact path="/learn_more">
            <LearnMorePage />
          </Route>
        </Switch>

        {revealUpload && <UploadVideoModal />}
      </div>
    </div>
  );
}

export default App;