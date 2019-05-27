import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import FormComponent from './components/FormComponent';
import DataTable from './components/DataTable';

export default class App extends Component {

  constructor(props) {
    super(props);
    const values = {};
  }

  state = { 
    username: null, 
    values : {
      name:'nabil'
    } 
  };

  componentDidMount() {
    fetch('/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  sendFormValues = (values) => {
    // const formValues = { ...this.state.formValues }
    this.values = values;

    // formValues[values] = values;

    // this.setState({ values:values })

    // console.log('form values in parent', formValues);
    // TODO : This is being received , but not being set to the state correctkly ????
    
    // console.log('STATE in parent', this.state.values);
    // console.log('parent component', this.values);
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
