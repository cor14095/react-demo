import React from 'react';

import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <ul>
      <li>
        <Link to={ROUTES.MAKE_STUDENT}>New Students</Link>
      </li>
      <li>
        <Link to={ROUTES.MAKE_CLASS}>New Class</Link>
      </li>
      <li>
        <Link to={ROUTES.ASSIGN_CLASS}>Assign Classes</Link>
      </li>
      <li>
        <Link to={ROUTES.GRADE_CLASS}>Grade Classes</Link>
      </li>
    </ul>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
