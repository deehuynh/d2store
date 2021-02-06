import React from 'react';
import * as firebase from 'firebase';

export default class App extends React.Component {
  componentDidMount() {
    firebase.database().ref("test").set({
      name: 'hoho',
      age: '12'
    });
  }
  render () {
    return <div>hihi</div>;
  }
}