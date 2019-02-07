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
      // startDate: new Date(),
      // endDate: new Date()
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

  // handleDateChange = (dateName, dateValue) => {
  //   dateValue = dateName === 'startDate' ? (this.state.startDate = dateValue) : (this.state.endDate = dateValue);
  //   this.setState({
  //     [dateName]: dateValue
  //   });
  // };

  submitForm = e => {
    e.preventDefault();
    console.log('form clicked from front end', this.state);


    axios.post(`http://localhost:8080/create`, this.state)
      .then(res => {
        console.log("response", res);
        console.log(res.data);
      })

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
        {/* <Datepicker
          selected={this.state.startDate}
          onChange={value => this.handleDateChange("startDate", value)}
        />
        <br />
        <Datepicker
          selected={this.state.endDate}
          onChange={value => this.handleDateChange("endDate", value)}
        /> */}
        <button onClick={this.submitForm} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default FormComponent;
