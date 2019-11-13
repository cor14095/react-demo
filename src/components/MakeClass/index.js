import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const MakeClassPage = () => (
    <div>
      <h1>New Class info</h1>
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
        <form onSubmit={this.onSubmit}>
          <input
            name="className"
            value={className}
            onChange={this.onChange}
            type="text"
            placeholder="Class Name"
          />
          <input
            name="cid"
            value={cid}
            onChange={this.onChange}
            type="number"
            placeholder="Class ID"
          />
          <button disabled={isInvalid} type="submit">
            New Class
          </button>
  
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
  
  const MakeClassForm = withRouter(withFirebase(MakeClassFormBase));
  
  export default MakeClassPage;
  
  export { MakeClassForm };