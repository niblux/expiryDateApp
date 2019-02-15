import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import FormComponent from './components/FormComponent';

export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <FormComponent />
        {/* {username ? <h1>{`Hello ${username} and code`}</h1> : <h1>Loading.. please wait!</h1>} */}
        {/* <img src={ReactImage} alt="react" /> */}
        {/* <h1>Yo!</h1> */}
      </div>
    );
  }
}
