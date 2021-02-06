import React from 'react';

class SecondNavigation extends React.Component {
  render () {
    return (
        <div className="second-navigation">
          {this.props.children}
        </div>
    );
  }
}

export default SecondNavigation;