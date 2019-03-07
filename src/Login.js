import React, { Component } from 'react';
import firebase from './Firebase';
import FormError from './FormError';
import { navigate } from '@reach/router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    //console.log(this.props);
    //I cannot pass the idUSER because it is not ready!
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(
      registrationInfo.email,
      registrationInfo.password
    )
    .then(() => {
      navigate(`/`);
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
      <form
        className="form-single-border"
        onSubmit={this.handleSubmit}>
        <div className="container-custom container-custom--sm">
          <div className="container-custom__inner">
              {this.state.errorMessage !== null ? (
                <FormError
                  theMessage={this.state.errorMessage}/>
              ) : null}
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}/>
              <input
                required
                className=""
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}/>
              <button
                className="btn__app"
                type="submit">
                Log in
              </button>
          </div>
        </div>
      </form>
    );
  }
}
export default Login;
