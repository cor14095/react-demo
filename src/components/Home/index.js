import React from 'react';

import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <ListGroup>
      <ListGroupItem>
        <Button tag={Link} to={ROUTES.MAKE_STUDENT} color="primary">
          New Students
        </Button>
      </ListGroupItem>
      <ListGroupItem>
        <Button tag={Link} to={ROUTES.MAKE_CLASS} color="primary">
          New Class
        </Button>
      </ListGroupItem>
      <ListGroupItem>
        <Button tag={Link} to={ROUTES.ASSIGN_CLASS} color="primary">
          Assign Classes
        </Button>
      </ListGroupItem>
      <ListGroupItem>
        <Button tag={Link} to={ROUTES.GRADE_CLASS} color="primary">
          Grade Classes
        </Button>
      </ListGroupItem>
    </ListGroup>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
