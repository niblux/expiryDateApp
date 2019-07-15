/* eslint-disable no-param-reassign */
import React from 'react';

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.foodName = React.createRef();
    this.foodType = React.createRef();
    this.purchaseDate = React.createRef();
    this.expiryDate = React.createRef();
    this.notes = React.createRef();

    const values = {
      name: '',
      surname: '',
      purchaseDate: '',
      expiryDate: '',
      notes: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDateChange = (dateName, dateValue) => {
    dateValue = dateName === 'purchaseDate' ? (this.values.purchaseDate = dateValue) : (this.values.expiryDate = dateValue);
    this.setState({
      [dateName]: dateValue
    });
  };

  makeRequest = (url = '', methodType, data = {}) => {
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
    this.makeRequest('http://localhost:8080/create', "PUT", values)
      .then(data => console.log('Updated successfully : response', data))
      .catch(error => console.log(error));
  }

  getFormData = e => {
    e.preventDefault();
    this.makeRequest('http://localhost:8080/create', "GET", values)
      .then(data => console.log('Retrieved Data : response', data))
      .catch(error => console.log(error));
  }

  submitForm = e => {
    e.preventDefault();
    // Adding the form data to values object.
    this.values = {
      name: this.foodName.current.value,
      type: this.foodType.current.value,
      purchase: this.state.purchaseDate,
      expiryDate: this.state.expiryDate,
      notes: this.notes.current.value
    }

    console.log('submitted values', this.values);

    // This will send the values via prop drilling to parent app component. 
    this.props.sendFormValues(this.values);

    this.makeRequest('http://localhost:8080/create', "POST", this.values)
      .then(data => console.log(JSON.stringify('POSTED DATA', data)))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label htmlFor="foodName">Food Item Name</label>
            <input onChange={this.handleChange} type="text" className="form-control" ref={this.foodName} id="foodName" name="foodName" />
            <label htmlFor="foodName">Food Type</label>
            <input onChange={this.handleChange} type="text" className="form-control" ref={this.foodType} id="foodType" name="foodType" />
            <label htmlFor="foodName">Purchase Date</label>
            <input onChange={this.handleChange} type="date" className="form-control" ref={this.purchaseDate} id="purchaseDate" name="purchaseDate" type="date" />
            <label htmlFor="foodName">Expiry Date</label>
            <input onChange={this.handleChange} type="date" className="form-control" ref={this.expiryDate} id="expiryDate" name="expiryDate" type="date" />
            <label htmlFor="foodName">Addtional Notes</label>
            <textarea className="form-control" ref={this.notes} id="notes" type="text" name="notes" placeholder="Notes ..."></textarea>
            <button className="btn btn-info mt-2">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default FormComponent;
