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
import UserEditForm from './components/UserEditForm/UserEditForm';

const App = () => {
  const location = useLocation();
  const topBarVisible = location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/edit";

  const [ revealUpload, setRevealUpload ] = useState(false);
  const [ revealEditForm, setRevealEditForm ] = useState(false);
  
  return (
    <div className="app">
      {topBarVisible && <TopBar setRevealEditForm={setRevealEditForm} setRevealUpload={setRevealUpload} revealUpload={revealUpload}/>}

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
        <Route exact path="/recover">
          <AccountRecoverForm />
        </Route>
        <Route exact path="/learn_more">
          <LearnMorePage />
        </Route>
        <Route exact path="/videos/:id">
          <VideoShowPage />
        </Route>
        <Route exact path="/:handle">
          <UserChannelPage setRevealEditForm={setRevealEditForm}/>
        </Route>
      </Switch>

      { revealUpload && <UploadVideoModal setRevealUpload={setRevealUpload}/> }
      { revealEditForm && <UserEditForm setRevealEditForm={setRevealEditForm}/> }
    </div>
  );
}

export default App;