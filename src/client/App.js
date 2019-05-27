import './app.css';
import React, { Component } from 'react';
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

  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.state);
  }

  sendFormValues = (values) => {
    const formValues = { ...this.state.values }

    formValues[values] = values;

    this.setState({ formValues });

    console.log('formValues from parent app', formValues);
  }

  render() {
    console.log('parent component', this.values);
    return (
      <div>
        <FormComponent sendFormValues={this.sendFormValues} />
        <DataTable values={this.values} />
      </div>
    );
  }
}
