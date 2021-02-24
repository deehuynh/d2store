import React from 'react';
import {Link} from 'react-router-dom';

function HContentBar (props) {

    return (
      <div className="header-bar">
        <span className="header-bar-title">{props.title}</span>
        <Link to={`/${props.category}`} className="header-bar-more">See more</Link>
      </div>
    );
    
}

export default HContentBar;