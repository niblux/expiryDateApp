/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import React from 'react';

const FormComponent = props => {

  let foodName = React.createRef();
  let foodType = React.createRef();
  let purchaseDate = React.createRef();
  let expiryDate = React.createRef();
  let notes = React.createRef();

  let initItems = { foodName: '', foodType: '', purchaseDate: '', expiryDate: '', notes: '', editing: false };

  const [items, setItem] = useState(initItems)

  const handleChange = e => {
    const { name, value } = e.target;
    setItem({ ...items, [name]: value });
  };

  return (
    <div>
      <form onSubmit={(e) => props.addItems(e, items)}>
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
          <textarea onChange={handleChange} className="form-control" ref={notes} id="notes" type="text" name="notes" placeholder="Notes ..."></textarea>
          <button className="btn btn-info mt-2">Submit</button>
        </div>
      </form>
    </div>
  );
}


export default FormComponent;
