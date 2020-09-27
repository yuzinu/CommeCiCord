import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import Splash from './splash/splash_container';
import SignUpFormContainer from './session_form/signup_form_container';
import SessionFormContainer from './session_form/session_form_container';
import AuthForm from './session_form/auth_form';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <header>
    </header>
    <Switch>
      <Route exact path="/" component={Splash} />
      <ProtectedRoute exact path="/channels/@me" component={SessionFormContainer} />
      <AuthRoute exact path="/login" component={SessionFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
    </Switch>
  </div>
);

export default App;