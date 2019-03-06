import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import FormComponent from './components/FormComponent';
import DataTable from './components/DataTable';

export default class App extends Component {

  constructor(props) {
    super(props);
    const formValues = {};
  }

  state = { 
    username: null
  };

  componentDidMount() {
    fetch('/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }
  componentDidUpdate(){
    console.log('state', this.state);
  }

  sendFormValues = (values) => {
    // Make copy , just Object.assign(obj, {});
    const formValues = { ...this.state.values }

    // not sure what is going here. 
    formValues[values] = values;

    this.setState({ formValues });
    
    console.log('formValues', formValues);
    console.log('values (PARAM)', formValues);
  }

  render() {
    const { username } = this.state;
    console.log('parent component', this.values);
    return (
      <div>
        <FormComponent sendFormValues={this.sendFormValues} />
        <DataTable values={this.values} />
        {/* {username ? <h1>{`Hello   ${username} and code`}</h1> : <h1>Loading.. please wait!</h1>} */}
        {/* <img src={ReactImage} alt="react" /> */}
        {/* <h1>Yo!</h1> */}
      </div>
    );
  }
}
