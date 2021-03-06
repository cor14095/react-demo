import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import MakeStudentPage from '../MakeStudent';
import MakeClassPage from '../MakeClass';
import AssignClassPage from '../AssignClass';
import GradeClassPage from '../GradeClass';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />

      <Route exact path={ROUTES.MAKE_STUDENT} component={MakeStudentPage} />
      <Route exact path={ROUTES.MAKE_CLASS} component={MakeClassPage} />
      <Route exact path={ROUTES.ASSIGN_CLASS} component={AssignClassPage} />
      <Route exact path={ROUTES.GRADE_CLASS} component={GradeClassPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
