/* eslint-disable no-param-reassign */
import React, { useState } from 'react';

const FormComponent = props => {

  let foodName = React.createRef();
  let foodType = React.createRef();
  let purchaseDate = React.createRef();
  let expiryDate = React.createRef();
  let notes = React.createRef();

  let initItems = { name: '', type: '', purchase: '', expiryDate: '', notes: '' };

  const [items, setItems] = useState(initItems)

  const handleChange = e => {
    const { name, value } = e.target;
    setItems({ ...items, [name]: value });
  };

  const makeRequest = (url = '', methodType, data = {}) => {
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

  const submitForm = e => {
    e.preventDefault();
    // Adding the form data to values object.
    initItems = {
      name: foodName.current.value,
      type: foodType.current.value,
      purchase: items.purchaseDate,
      expiryDate: items.expiryDate,
      notes: notes.current.value
    }

    console.log('submitted values', initItems);

    makeRequest('http://localhost:8080/create', "POST", initItems)
      .then(data => console.log('POSTED DATA', data))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="foodName">Food Item Name</label>
          <input onChange={handleChange} type="text" className="form-control" ref={foodName} id="foodName" name="foodName" />
          <label htmlFor="foodName">Food Type</label>
          <input onChange={handleChange} type="text" className="form-control" ref={foodType} id="foodType" name="foodType" />
          <label htmlFor="foodName">Purchase Date</label>
          <input onChange={handleChange} type="date" className="form-control" ref={purchaseDate} id="purchaseDate" name="purchaseDate" type="date" />
          <label htmlFor="foodName">Expiry Date</label>
          <input onChange={handleChange} type="date" className="form-control" ref={expiryDate} id="expiryDate" name="expiryDate" type="date" />
          <label htmlFor="foodName">Addtional Notes</label>
          <textarea className="form-control" ref={notes} id="notes" type="text" name="notes" placeholder="Notes ..."></textarea>
          <button className="btn btn-info mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
}


export default FormComponent;
