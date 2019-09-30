import React, { useState, useRef, useEffect } from 'react';

const TableRow = (props) => {

  let initItems = { foodName: '', foodType: '', purchaseDate: '', expiryDate: '', notes: '' };
  const [updatedItems, setItems] = useState(initItems);

  //creating the ref by passing initial value null
  const handleEditing = (e, index) => {
    console.log(e.target.value)
    console.log('props', props.items)
    // Clone students data before mutation
    const updatedItems = props.items.map((item, key) => ({ ...item }))
    // Update field by index of current student
    updatedItems[index][key] = e.target.value
    console.log('updated', updatedItems);
    // Trigger re-render
    setItems(updatedItems);
  }

  const seEditing = (item, index) => {
    const items = props.items.map(i => ({ ...i, editing: item.editing && i === item }))
    items[index].editing = true;
    console.log('this item should be true >', items[index]);
    setItems(items);
  }

  return (
    props.items.length > 0 ? (props.items.map((item, index) => (
      <tr key={item._id}>
        <td>{item.editing ? <input type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.foodName} /> : item.foodName}</td>
        <td>{item.editing ? <input type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.foodType} /> : item.foodType}</td>
        <td>{item.editing ? <input type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.purchaseDate} /> : item.purchaseDate}</td>
        <td>{item.editing ? <input type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.notes} /> : item.notes}</td>
        <td><button onClick={() => props.deleteUser(item._id)} type="button" className="btn btn-danger">Delete</button></td>
        <td><button type="button" onClick={(e) => { console.log('inside loop', item) || seEditing(item, index) }} className="btn btn-info">Edit</button></td>
        <td><button onClick={() => props.updateItems(currentItem)} type="button" className="btn btn-success">Save</button></td>
      </tr>
    ))) : (<tr><td key={0}>{'No Items'}</td></tr>)
  )
}

export default TableRow;