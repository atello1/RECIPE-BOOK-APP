import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    const { userName } = this.props;

    return (
      <div className="welcome">
        <span className="welcome--person">
          Welcome {userName}
        </span>
      </div>
    );
  }
}

export default Welcome;
