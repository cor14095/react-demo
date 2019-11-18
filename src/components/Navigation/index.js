import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Nav>
    <NavItem>
      <NavLink tag={Link} to={ROUTES.LANDING}>Landing</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to={ROUTES.HOME}>Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to={ROUTES.ACCOUNT}>Account</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to={ROUTES.ADMIN}>Admin</NavLink>
    </NavItem>
    <NavItem>
      <SignOutButton />
    </NavItem>
  </Nav>
);

const NavigationNonAuth = () => (
  <Nav>
    <NavItem>
      <NavLink tag={Link} to={ROUTES.LANDING}>Landing</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to={ROUTES.SIGN_IN}>Sign In</NavLink>
    </NavItem>
  </Nav>
);

export default Navigation;
