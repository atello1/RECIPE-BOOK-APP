// Import React
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './Firebase';
import Home from './Home';
import Welcome from './Welcome';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import Recipes from './Recipes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate(`/`);
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
    .auth()
    .signOut()
    .then(() => {
      navigate('/login');
    });
  };

  render() {
    return (
      <div>
        <Navigation
          user={this.state.user}
          logOutUser={this.logOutUser}
          userID={this.state.userID}/>
        {this.state.user && (
          <Welcome
            userName={this.state.displayName} />
        )}
        <Router>
          <Home
            path="/"
            user={this.state.user}
            userID={this.state.userID}/>
          <Login
            path="/login"/>
          <Recipes
            path="/recipes/:userID"
            userID={this.state.userID}/>
          <Register
            path="/register"
            registerUser={this.registerUser}/>
        </Router>
      </div>
    );
  }
}

export default App;
