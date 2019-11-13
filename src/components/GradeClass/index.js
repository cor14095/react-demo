import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const GradeClassPage = () => (
    <div>
      <h1>Student's info</h1>
      <GradeClassForm />
    </div>
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
        <div>
            <div>
                <h2>Students:</h2>
                <ul>
                    {
                        Object.keys(this.state.students).map( (index, key) => {
                            return (
                                <li key={key}>
                                    Student: {this.state.students[index].studentName} - SID: {this.state.students[index].sid}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

            <br />
            <div>
                <form onSubmit={this.onRequestStudent}>
                    <label> Student ID:</label>
                    <input
                        name="sid"
                        value={sid}
                        onChange={this.onChange}
                        type="number"
                        placeholder="Student ID"
                    />
                    <button disabled={isInvalid} type="submit">
                        Get Student info
                    </button>
                </form>
            </div>

            <br />
            <div>
                <form onSubmit={this.onSubmit}>
                    <ul>
                        {
                            (this.state.studentInfo !== null) &&
                            (
                                <li>
                                    {`Student name: ${this.state.studentInfo.studentName}`}
                                </li>
                            )
                        }
                        {
                            (this.state.studentInfo !== null) &&
                            (
                                <li>
                                    {`Student ID: ${this.state.studentInfo.sid}`}
                                </li>
                            )
                        }
                        {
                            (this.state.studentInfo) &&
                            (this.state.studentInfo.classes) &&
                            (
                                Object.keys(this.state.studentInfo.classes).map( (index, key) => {
                                    return (
                                        <li key={key}>
                                            {`${index}: `}
                                            <input 
                                                id={index}
                                                type="number"
                                                placeholder="0.0"
                                            />
                                        </li>
                                    )
                                })
                            )
                        }
                    </ul>
                    {
                        (this.state.studentInfo) &&
                        (
                            <button type="submit">
                                Grade Classes
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
      );
    }
  }
  
  const GradeClassForm = withRouter(withFirebase(GradeClassFormBase));
  
  export default GradeClassPage;
  
  export { GradeClassForm };