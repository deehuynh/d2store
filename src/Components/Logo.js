import React from 'react';
import {Link} from 'react-router-dom';

class Logo extends React.Component {
  render () {
    return <Link id="logo" to="/"><span>D2</span> store.com</Link>;
  }
}

export default Logo;