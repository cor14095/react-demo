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
  ListGroupItem } from 'reactstrap';

const AssignClassPage = () => (
    <div>
      <h1>
          Assign Class to student
      </h1>
      <AssignClassForm />
    </div>
);

const INITIAL_STATE = {
    className: '',
    cid: 0,
    studentName: '',
    sid: 0,
    classes: [],
    students: [],
    error: null,
};

class AssignClassFormBase extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        this.getStudents();
        this.getClasses();
    }

    getClasses() {
        this.props.firebase
        .classes()
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                this.setState({
                    classes: snapshot.val()
                });
            }
        });
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

    onSubmit = event => {
        event.preventDefault();
        const { cid, sid } = this.state;

        if ((sid in this.state.students) && (cid in this.state.classes)) {
            console.log(this.state.classes[cid])
            this.props.firebase
                .student(sid)
                .child("classes")
                .update({
                    [this.state.classes[cid].className]: {
                        cid: this.state.classes[cid].cid,
                        className: this.state.classes[cid].className,
                        grade: 0
                    }
                }).then(() => {
                    this.setState({ ...INITIAL_STATE });
                    this.props.history.push(ROUTES.HOME);
                }).catch(error => {
                    this.setState({ error });
                });
        } else {
            console.log("error")
            this.setState({
                error: {message: 'El CID o SID no existen.'}
            })
        }
    };

    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    render() {
      const {
        sid,
        cid,
        error
      } = this.state;

      const isInvalid =
        cid === 0 ||
        sid === 0;

    return (
        <Container>
            <Row>
              <Col xs={{size: 5, offset: 1}}>
                <h2>Classes:</h2>
                <ListGroup>
                    {
                        Object.keys(this.state.classes).map( (index, key) => {
                            return (
                                <ListGroupItem key={key}>
                                    Class: {this.state.classes[index].className} - CID: {this.state.classes[index].cid}
                                </ListGroupItem>
                            );
                        })
                    }
                </ListGroup>
              </Col>
              <Col xs={{size: 5}}>
                <h2>Students:</h2>
                <ListGroup>
                    {
                        Object.keys(this.state.students).map( (index, key) => {
                            return (
                                <ListGroupItem key={key}>
                                    Student: {this.state.students[index].studentName} - SID: {this.state.students[index].sid}
                                </ListGroupItem>
                            );
                        })
                    }
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Form onSubmit={this.onSubmit}>
                  <h2>Selecciona un CID y un SID para asignar la clase al estudiante</h2>

                  <br />
                  <Label> Class ID:</Label>
                  <Input
                      name="cid"
                      value={cid}
                      onChange={this.onChange}
                      type="number"
                      placeholder="Class ID"
                  />

                  <br />
                  <Label> Student ID:</Label>
                  <Input
                      name="sid"
                      value={sid}
                      onChange={this.onChange}
                      type="number"
                      placeholder="Student ID"
                  />

                  <br />
                  <Button disabled={isInvalid} type="submit">
                      Assign Class
                  </Button>

                  {error && <p>{error.message}</p>}
              </Form>
            </Row>
        </Container>
      );
    }
  }

  const AssignClassForm = withRouter(withFirebase(AssignClassFormBase));

  export default AssignClassPage;

  export { AssignClassForm };
