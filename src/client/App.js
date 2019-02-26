import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import FormComponent from './components/FormComponent';
import DataTable from './components/DataTable';

export default class App extends Component {
  state = { 
    username: null, 
    values : {} 
  };

  componentDidMount() {
    fetch('/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  sendFormValues = (values) => {
    // const formValues = { ...this.state.formValues }

    // formValues[values] = values;

    this.setState({ values })

    // console.log('form values in parent', formValues);
    console.log('STATE in parent', this.state.values);
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        <FormComponent sendFormValues={this.sendFormValues} />
        <DataTable/>
        {/* {username ? <h1>{`Hello ${username} and code`}</h1> : <h1>Loading.. please wait!</h1>} */}
        {/* <img src={ReactImage} alt="react" /> */}
        {/* <h1>Yo!</h1> */}
      </div>
    );
  }
}
