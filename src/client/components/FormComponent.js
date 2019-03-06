// import axios from 'axios';
import React from 'react';
import Grid from "@material-ui/core/Grid";
// import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

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
  

  handleChange = e => {
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

  // Example POST method implementation:


  postData = (url = ``,methodType,  data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
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
  updateForm = e => {
    e.preventDefault();
    this.postData('http://localhost:8080/create', "PUT", values)
    .then(data => console.log('Updated successfully : response', data))
    .catch(error => console.log(error));
  }

  submitForm = e => {

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

    this.postData('http://localhost:8080/create', "POST" , this.values)
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
}

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <Grid container spacing={40}>
          <Grid item xs={12} sm={6}>
            <TextField type="text" inputRef={this.firstName} id="firstName" name="firstName" label="First name" fullWidth autoComplete="fname" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField type="text" inputRef={this.lastName} id="lastName" name="lastName" label="Last name" fullWidth autoComplete="lname" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField inputRef={this.startDate} id="startDate" label="Start Date" type="date" fullWidth defaultValue="2017-05-24" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField inputRef={this.endDate} id="endDate" label="End Date" type="date" fullWidth defaultValue="2017-05-24" />
          </Grid>

          <Grid item xs={12}>
            <TextField inputRef={this.notes} id="notes" label="Notes" type="text" fullWidth placeholder="Notes ..." />
          </Grid>

          <Button type="submit" variant="contained" color="primary">
            Submit
              </Button>
        </Grid>
        <button type="submit">
          Submit
        </button>
        <button onClick={this.updateForm} type="submit">
          Update
        </button>
      </form>
    );
  }
}

export default FormComponent;
