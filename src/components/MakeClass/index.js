import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const MakeClassPage = () => (
    <div>
      <MakeClassForm />
    </div>
);

const INITIAL_STATE = {
    className: '',
    cid: 0,
    error: null,
};

class MakeClassFormBase extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
      const { className, cid } = this.state;

      this.props.firebase
        .class(cid)
        .set({
            cid,
            className
        }).then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        }).catch(error => {
            this.setState({ error });
        });

      event.preventDefault();
    };

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    render() {
      const {
        className,
        cid,
        error
      } = this.state;

      const isInvalid =
        cid === 0 ||
        className === '';

      return (
        <Container>
          <Form onSubmit={this.onSubmit}>
            <Row>
              <h1>New Class info</h1>
            </Row>
            <Row>
              <FormGroup>
                <Label for="className">Class Name</Label>
                <Input
                  name="className"
                  value={className}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Class Name"
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="cid">Class's ID</Label>
                <Input
                  name="cid"
                  value={cid}
                  onChange={this.onChange}
                  type="number"
                  placeholder="Class ID"
                />
              </FormGroup>
            </Row>
            <Row>
              <Button disabled={isInvalid} type="submit">
                New Class
              </Button>
            </Row>
            <Row>
              {error && <p>{error.message}</p>}
            </Row>
          </Form>
        </Container>
      );
    }
  }

  const MakeClassForm = withRouter(withFirebase(MakeClassFormBase));

  export default MakeClassPage;

  export { MakeClassForm };
