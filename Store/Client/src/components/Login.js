import React from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../../src/Login.css";
const querystring = require('querystring');
const qs = require('qs');

class Login extends React.Component {
  // constructor(){
  //     super();
  // this.storeInput = React.createRef();
  // }
  emailInput = React.createRef();
  passwordInput = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMsg: false
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const loggedUser = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`http://localhost:4000/user/login`, qs.stringify(loggedUser))
      .then(res => {
        localStorage.setItem('token', JSON.stringify(res.data));
        this.props.history.push(`/`);
      })
      .catch(error => {
        this.setState({errorMsg:true});
      })     
  }
 
  errorAlert(errorMsg) {
    if (!errorMsg) return null;
    return (
      <div class="alert alert-danger text-center" role="alert">
        Email or Password is incorrect
      </div>
    )
  }

  render() {
    const errorMsg  =  this.state.errorMsg;
console.log(errorMsg);
    return (
      <div>
      {this.errorAlert(errorMsg)}
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <span>Email</span>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <span>Password</span>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
      </div>
    );

  }
}

export default Login;