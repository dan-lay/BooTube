import { Switch, Route } from 'react-router-dom';
import UserLoginForm from './components/UserLoginForm';
import AccountRecoverForm from './components/AccountRecoverForm';
import LearnMorePage from './components/LearnMorePage';
import VideoIndexPage from './components/VideoIndexPage';
import UserSignupForm from './components/UserSignupForm';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/login">
          <UserLoginForm />
        </Route>
        <Route path="/signup">
          <UserSignupForm />
        </Route>
        <Route exact path="/">
          <VideoIndexPage />
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