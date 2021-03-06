import React, { useState, useRef, useEffect } from 'react';
import { makeRequest } from '../../helpers';

const TableRow = (props) => {

  let initItems = { foodName: '', foodType: '', purchaseDate: '', expiryDate: '', notes: '', editing: false };
  const [updatedItems, setItems] = useState(updatedItems);
  const [itemUpdated, setItemId] = useState('');
  const [editFlag, setEditFlag] = useState(false);

  // this function is saving the updated data
  const handleEditing = (e, index) => {
    // let newArr = [...updatedItems]; // copying the old datas array
    const newVal = updatedItems[index][e.target.name] = e.target.value;
    setItems([...updatedItems], newVal);
    setItemId(updatedItems[index]);
  }

  const saveItems = async () => {
    setEditFlag(false);
    setItems(updatedItems)
    // console.log('item being updated', itemUpdated);
    const res = await makeRequest(`http://localhost:8080/update/${itemUpdated._id}`, "PUT", updatedItems)
    // console.log('res', res);
    // .then(data => console.log('POSTED DATA in UPDATE', data))
    // .catch(error => console.error(error));
  }

  // this function is setting the row to editable
  const setEditing = (item, index) => {
    const items = props.items.map(i => ({ ...i, editing: item.editing && i === item }))
    console.log('items', items);
    items[index].editing = true;
    setEditFlag(true);
    setItems(items);
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('http://localhost:8080/items');
      const data = await request.json();
      // console.log('am i being run', data);
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    props.items.length > 0 ? (props.items.map((item, index) => (
      <tr key={item._id}>
        <td>{editFlag ? <input name="foodName" type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.foodName} /> : item.foodName}
        </td>
        <td>{editFlag ? <input name="foodType" type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.foodType} /> : item.foodType}
        </td>
        <td>{editFlag ? <input name="purchaseDate" type="date" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.purchaseDate} /> : item.purchaseDate}
        </td>
        <td>{editFlag ? <input name="expiryDate" type="date" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.expiryDate} /> : item.expiryDate}
        </td>
        <td>{editFlag ? <input name="notes" type="text" onChange={(e) => { handleEditing(e, index) }} defaultValue={item.notes} /> : item.notes}
        </td>
        <td>
          <button onClick={() =>
            props.deleteUser(item._id)} type="button" className="btn btn-danger">Delete
          </button>
        </td>
        <td>
          <button type="button" onClick={(e) => setEditing(item, index)} className="btn btn-info">Edit
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