import React, { Component } from 'react';
import FormError from './FormError';
import firebase from './Firebase';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      passOne: '',
      passTwo: '',
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.passOne !== this.state.passTwo) {
        this.setState({ errorMessage: 'Passwords no not match' });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  }

  handleSubmit(e) {
    var registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne
    };
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(registrationInfo.displayName);
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  }

  render() {
    return (
      <form className="form-single-border" onSubmit={this.handleSubmit}>
        <div className="container-custom container-custom--sm">
          <div className="container-custom__inner">
            {this.state.errorMessage !== null ? (
              <FormError
                theMessage={this.state.errorMessage}/>
            ) : null}
            <input
              type="text"
              id="displayName"
              placeholder="Name"
              name="displayName"
              required
              value={this.state.displayName}
              onChange={this.handleChange}
              />
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              required
              name="email"
              value={this.state.email}
              onChange={this.handleChange}/>
            <input
              type="password"
              name="passOne"
              placeholder="Password"
              value={this.state.passOne}
              onChange={this.handleChange}/>
            <input
              type="password"
              required
              name="passTwo"
              placeholder="Repeat Password"
              value={this.state.passTwo}
              onChange={this.handleChange}/>
            <button className="btn__app" type="submit">
              Register
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
