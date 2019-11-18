import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const MakeStudentPage = () => (
    <div>
      <MakeStudentForm />
    </div>
);

const INITIAL_STATE = {
    studentName: '',
    sid: 0,
    error: null,
};

class MakeStudentFormBase extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
      const { studentName, sid } = this.state;

      this.props.firebase
        .student(sid)
        .set({
            sid,
            studentName
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
        studentName,
        sid,
        error
      } = this.state;

      const isInvalid =
        sid === 0 ||
        studentName === '';

      return (
        <Container>
          <Form onSubmit={this.onSubmit}>
            <Row>
              <h1>New Student's info</h1>
            </Row>
            <Row>
              <FormGroup>
                <Label for="studentName">Student Name</Label>
                <Input
                  name="studentName"
                  value={studentName}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Student Name"
                />
              </FormGroup>
            </Row>
            <Row>
              <FormGroup>
                <Label for="sid">Student's ID</Label>
                <Input
                  name="sid"
                  value={sid}
                  onChange={this.onChange}
                  type="number"
                  placeholder="Student's ID"
                />
              </FormGroup>
            </Row>
            <Row>
              <Button disabled={isInvalid} type="submit">
                New Student
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

  const MakeStudentForm = withRouter(withFirebase(MakeStudentFormBase));

  export default MakeStudentPage;

  export { MakeStudentForm };
