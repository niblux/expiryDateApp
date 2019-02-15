import axios from 'axios';
import React from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      notes: '',
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
    // the above binding makes both functions this apply to  the formcomponent.
    // not sure if this is needed. 
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
 
  // TODO: DO GIT IGNORE FOR YARN LOCK , AND VARIABLE.ENV

  handleDateChange = (dateName, dateValue) => {
    dateValue = dateName === 'startDate' ? (this.state.startDate = dateValue) : (this.state.endDate = dateValue);
    this.setState({
      [dateName]: dateValue
    });
  };

  // Example POST method implementation:


  postData = (url = ``, data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => response.json()); // parses response to JSON
}

  submitForm = e => {
    e.preventDefault();
    console.log('form clicked from front end', this.state);

    this.postData(`http://localhost:8080/create`, this.state)
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));

    // axios.post(`http://localhost:8080/create`, this.state)
    //   .then(res => {
    //     console.log("response", res);
    //     console.log(res.data);
    //   })

    // axios.post('http://localhost:8080/create', {
    //   data:this.state
    // })
    //   .then(function(response) {
    //     console.log(response);
    // })
    //   .catch(function(error) {
    //     console.log(error);
    // });

}

  render() {
    return (
      <form method="POST">
        <label htmlFor='firstName'>First Name</label>
        <input
          name="firstName"
          onChange={e => this.handleChange(e)}
          type="text"
        />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          onChange={e => this.handleChange(e)}
          type="text"
        />
        <br />
        <label htmlFor="notes">Notes ...</label>
        <input
          name="notes"
          onChange={e => this.handleChange(e)}
          type="text"
          placeholder="Any extra information about your request"
        />
        <br />
        <Datepicker
          selected={this.state.startDate}
          onChange={value => this.handleDateChange("startDate", value)}
        />
        <br />
        <Datepicker
          selected={this.state.endDate}
          onChange={value => this.handleDateChange("endDate", value)}
        />
        <button onClick={this.submitForm} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default FormComponent;
