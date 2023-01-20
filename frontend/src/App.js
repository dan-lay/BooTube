import { Switch, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import VideoIndexPage from './components/VideoIndexPage/VideoIndexPage';
import VideoShowPage from './components/VideoShowPage/VideoShowPage';
import UserChannelPage from './components/UserChannelPage/UserChannelPage';
import TopBar from './components/TopBar/TopBar';
import UploadVideoForm from './components/forms/UploadVideoForm/UploadVideoForm';
import UserEditForm from './components/forms/UserEditForm/UserEditForm';
import UserLoginForm from './components/forms/UserLoginForm/UserLoginForm';
import UserSignupForm from './components/forms/UserSignupForm/UserSignupForm';

const App = () => {
  const location = useLocation();
  const topBarVisible = location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/edit";

  const [ revealUpload, setRevealUpload ] = useState(false);
  const [ revealEditForm, setRevealEditForm ] = useState(false);
  const [ sidebarSize, setSidebarSize ] = useState("max")
  
  return (
    <div className="app">
      {topBarVisible && <TopBar setSidebarSize={setSidebarSize} sidebarSize={sidebarSize} setRevealEditForm={setRevealEditForm} setRevealUpload={setRevealUpload} revealUpload={revealUpload}/>}

      <Switch>
        <Route exact path="/">
          <VideoIndexPage sidebarSize={sidebarSize}/>
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
          <UserChannelPage sidebarSize={sidebarSize} setRevealEditForm={setRevealEditForm}/>
        </Route>
      </Switch>

      { revealUpload && <UploadVideoForm setRevealUpload={setRevealUpload}/> }
      { revealEditForm && <UserEditForm setRevealEditForm={setRevealEditForm}/> }
    </div>
  );
}

export default App;