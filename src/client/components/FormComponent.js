/* eslint-disable no-param-reassign */
import React from 'react';

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.startDate = React.createRef();
    this.endDate = React.createRef();
    this.notes = React.createRef();

    const values = {
      name: '',
      surname: '',
      startDate: new Date(),
      endDate: new Date(),
      notes: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // TODO: DO GIT IGNORE FOR YARN LOCK , AND VARIABLE.ENV

  handleDateChange = (dateName, dateValue) => {
    dateValue = dateName === 'startDate' ? (this.values.startDate = dateValue) : (this.values.endDate = dateValue);
    this.setState({
      [dateName]: dateValue
    });
  };

  postData = (url = '', methodType, data = {}) => {
    return fetch(url, {
      method: methodType,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then(response => response.json()); // parses response to JSON
  }

  postData = (url = '', methodType, data = {}) => {
    return fetch(url, {
      method: methodType,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(data),
    })
      .then(response => response.json()); // parses response to JSON
  }


  updateForm = e => {
    e.preventDefault();
    this.postData('http://localhost:8080/create', "PUT", values)
      .then(data => console.log('Updated successfully : response', data))
      .catch(error => console.log(error));
  }

  submitForm = e => {
    console.log('clicking');

    e.preventDefault();

    // Adding the form data to values object.
    this.values = {
      name: this.firstName.current.value,
      surname: this.lastName.current.value,
      startDate: new Date(),
      endDate: new Date(),
      notes: this.notes.current.value
    }

    console.log('form clicked from front end', this.values);

    // This will send the values via prop drilling to parent app component. 
    this.props.sendFormValues(this.values);

    this.postData('http://localhost:8080/create', "POST", this.values)
      .then(data => console.log(JSON.stringify('POSTED DATA', data)))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>Food Item</label>
          <input type="text" ref={this.firstName} id="firstName" name="firstName" />
          <input type="text" ref={this.lastName} id="lastName" name="lastName" />
          <input type="date" ref={this.startDate} id="startDate" type="date" />
          <input type="date" ref={this.endDate} id="endDate" type="date" />
          <textarea ref={this.notes} id="notes" type="text" placeholder="Notes ..."></textarea>
        </form>
      </div>
    );
  }
}

export default FormComponent;
