import React from 'react';

import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

const Landing = () => (
  <div>
    <Card>
        <CardBody>
          <CardTitle>Landing</CardTitle>
          <CardSubtitle>This page is public</CardSubtitle>
          <CardText>The Landing Page is accessible by every signed in user.</CardText>
        </CardBody>
      </Card>
  </div>
);

export default Landing;
