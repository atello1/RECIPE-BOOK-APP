import React, { Component } from 'react';

class FormError extends Component {
  render() {
    const { theMessage } = this.props;

    return (
      <div className="error">
        {theMessage}
      </div>
    );
  }
}

export default FormError;
