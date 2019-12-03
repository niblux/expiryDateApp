import React, { useState, useRef, useEffect } from 'react';
import { makeRequest } from '../../helpers';

const TableRow = (props) => {

  let initItems = { foodName: '', foodType: '', purchaseDate: '', expiryDate: '', notes: '', editing:true };
  const [updatedItems, setItems] = useState(initItems);
  const [itemUpdated, setItemId] = useState('');

  // this function is saving the updated data
  const handleEditing = (e, index) => {
    let newArr = [...updatedItems]; // copying the old datas array
    const newVal = newArr[index][e.target.name] = e.target.value; 
    setItems([...newArr], newVal);
    console.log('id from update', newArr[index]._id)
    setItemId(newArr[index]._id);
  }


  const saveItems = () => {
    console.log('most recent state', updatedItems);
    console.log('id to update', itemUpdated);
    makeRequest(`http://localhost:8080/update/${itemUpdated}`, "PUT", updatedItems)
    .then(data => console.log('POSTED DATA', data))
    .catch(error => console.error(error));
  }

  // this function is setting the row to editable
  const seEditing = (item, index) => {
    const items = props.items.map(i => ({ ...i, editing: item.editing && i === item }))
    items[index].editing = true;
    setItems(items);
  }

  // useEffect(() => {
  //   console.log('useEffect', updatedItems);
  // }, []);

  return (
    props.items.length > 0 ? (props.items.map((item, index) => (
      <tr key={item._id} onClick={(e) => {seEditing(item, index)}}>
        <td>{item.editing ? <input name="foodName" type="text" onChange={(e) => 
          { handleEditing(e, index) }} defaultValue={item.foodName} /> : item.foodName}
        </td>
        <td>{item.editing ? <input name="foodType" type="text" onChange={(e) => 
            { handleEditing(e, index) }} defaultValue={item.foodType} /> : item.foodType}
        </td>
        <td>{item.editing ? <input name="purchaseDate" type="text" onChange={(e) => 
          { handleEditing(e, index) }} defaultValue={item.purchaseDate} /> : item.purchaseDate}
        </td>
        <td>{item.editing ? <input name="expiryDate" type="text" onChange={(e) => 
          { handleEditing(e, index) }} defaultValue={item.expiryDate} /> : item.expiryDate}
        </td>
        <td>{item.editing ? <input name="notes" type="text" onChange={(e) => 
          { handleEditing(e, index) }} defaultValue={item.notes} /> : item.notes}
        </td>
        <td>
          <button onClick={() => 
            props.deleteUser(item._id)} type="button" className="btn btn-danger">Delete
          </button>
        </td>
        <td>
          <button type="button" onClick={(e) => 
          { !item.editing ? item.editing = true : '' || seEditing(item, index) }} className="btn btn-info">Edit
          </button>
        </td>
        <td><button type="button" onClick={saveItems} className="btn btn-success">Save</button></td>
      </tr>
    ))) : (<tr><td key={0}>{'No Items'}</td></tr>)
  )
}

// add this after , updating to local state is working correctly
// onClick={() => props.updateItems(currentItem)}

export default TableRow;