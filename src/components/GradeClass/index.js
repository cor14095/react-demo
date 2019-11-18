import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Table } from 'reactstrap';

const GradeClassPage = () => (
    <Container>
      <Row>
        <Col xs={{size: 4, offset: 4}}>
          <h1>Student's info</h1>
        </Col>
      </Row>
      <GradeClassForm />
    </Container>
);

const INITIAL_STATE = {
    studentName: '',
    sid: 0,
    studentInfo: null,
    students: [],
    error: null,
};

class GradeClassFormBase extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
    }

    getStudents() {
        this.props.firebase
        .students()
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                this.setState({
                    students: snapshot.val()
                });
            }
        });
    }

    componentWillMount() {
        this.getStudents();
    }

    onRequestStudent = event => {
        const { sid } = this.state;

        this.props.firebase
        .student(sid)
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                this.setState({
                    studentInfo: snapshot.val()
                });
            }
        })

      event.preventDefault();

    }

    onSubmit = event => {
        event.preventDefault();
        const { sid } = this.state;

        Object.keys(this.state.studentInfo.classes).map((index) => {
            let value = document.getElementById(index).value;
            this.state.studentInfo.classes[index].grade = value;
            return 1;
        });

        let classes = this.state.studentInfo.classes

        this.props.firebase
            .student(sid)
            .update({
                classes
            }).then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            }).catch(error => {
                this.setState({ error });
            });
    };

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    render() {
      const {
        sid
      } = this.state;

      const isInvalid = sid === 0;

      return (
        <>
        <Row>
          <Col xs={{size: 10, offset: 1}}>
            <h2>Students:</h2>
          </Col>
          <Col xs={{size: 10, offset: 1}}>
            <Table>
              <thead>
                <tr>
                  <th>sid</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(this.state.students).map( (index, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          {this.state.students[index].sid}
                        </td>
                        <td>
                          {this.state.students[index].studentName}
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={{size:4, offset:4}}>
            <Form onSubmit={this.onRequestStudent}>
              <Label> Student ID:</Label>
              <Input
                name="sid"
                value={sid}
                onChange={this.onChange}
                type="number"
                placeholder="Student ID"
              />
              <Button disabled={isInvalid} type="submit">
                Get Student info
              </Button>
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={{size:4, offset:4}}>
            <Form onSubmit={this.onSubmit}>
              <ListGroup>
                {
                  (this.state.studentInfo !== null) &&
                  (
                    <ListGroupItem>
                      {`Student name: ${this.state.studentInfo.studentName}`}
                    </ListGroupItem>
                  )
                }
                {
                  (this.state.studentInfo !== null) &&
                  (
                    <ListGroupItem>
                      {`Student ID: ${this.state.studentInfo.sid}`}
                    </ListGroupItem>
                  )
                }
                {
                  (this.state.studentInfo) &&
                  (this.state.studentInfo.classes) &&
                  (
                    Object.keys(this.state.studentInfo.classes).map( (index, key) => {
                      return (
                        <ListGroupItem key={key}>
                          {`${index}: `}
                          <Input
                            id={index}
                            type="number"
                            placeholder="0.0"
                          />
                        </ListGroupItem>
                      )
                    })
                  )
                }
              </ListGroup>
              {
                (this.state.studentInfo) &&
                (
                  <Button type="submit">
                    Grade Classes
                  </Button>
                )
              }
            </Form>
          </Col>
        </Row>
        </>
      );
    }
  }

  const GradeClassForm = withRouter(withFirebase(GradeClassFormBase));

  export default GradeClassPage;

  export { GradeClassForm };
