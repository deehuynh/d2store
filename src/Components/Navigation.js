import React from 'react';

class Navigation extends React.Component {
  render () {
    return (
        <div className="navigation">
          {this.props.children}
        </div>
    );
  }
}

export default Navigation;