import React from 'react';

class HContentBar extends React.Component {
  render () {
    return (
      <div className="header-bar">
        <span className="header-bar-title">{this.props.title}</span>
        <a href="" className="header-bar-more">See more</a>
      </div>
    );
  }
}

export default HContentBar;