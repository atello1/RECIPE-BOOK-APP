import React, { Component } from 'react';
import { Link } from '@reach/router';

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container-custom home">
        {console.log("home")}
        {console.log(this.props)}
        <div className="container-custom__inner">
          <div className = "home--title" >
            RECIPE BOOK APP
          </div>

          {user == null && (
            <div>
              <p className="home--intro" >
                This is an exercise of REACTJS app that allows people to create an account and their own recipes list.
                It's an example of a Single Page Application which includes: <br/>
              <strong>
                Connection to a database(Firebase) and routing.
              </strong>
            </p>
            <div>
              <Link to="/register"
                className="btn__app">
                Register
              </Link>
              <Link
                to="/login"
                className="btn__app">
                Log In
              </Link>
              <small className="access">
                <sup>*</sup> For testing purposes you can login to the account: ana@hotmail.com / 111111 <br/> or create your own account
            </small>
          </div>
          </div>
        )}

        {user && (
          <div>
            <p>
              You are logged
            </p>
            <Link
              to={"/recipes/" + this.props.userID}
              className="btn__app ">
              Recipes
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
}
export default Home;
