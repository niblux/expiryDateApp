import React, { useState } from 'react';


const handleChange = () => {
    const foodName = useRef('');
    const foodType = useRef('');
    const expiryDate = useRef('');
    const purchaseDate = useRef('');
    const notes = useRef('');
}

const TableRow = (props) => {
    return(
         props.items.length > 0 ? (props.items.map((item, index) => (
            <tr key={item._id} onClick={() => {setEditing(true)}}>
              <td>{ props.editing ? <input ref={foodName} type="text" onChange={handleChange} defaultValue={item.foodName} /> : item.foodName}</td>
              <td>{ props.editing ? <input ref={foodType} type="text" onChange={handleChange} defaultValue={item.foodType} /> : item.foodType}</td>
              <td>{ props.editing ? <input ref={purchaseDate} type="text" onChange={handleChange} defaultValue={item.purchaseDate} /> : item.purchaseDate}</td>
              <td>{ props.editing ? <input ref={notes} type="text" onChange={handleChange} defaultValue={item.notes} /> : item.notes}</td>
              <td><button onClick={() => deleteUser(item._id)} type="button" className="btn btn-danger">Delete</button></td>
              {/* <td><button type="button" className="btn btn-info">Edit</button></td> */}
              <td><button onClick={() => updateItems(currentItem)} type="button" className="btn btn-success">Save</button></td>
            </tr>
          ))) : (<tr><td key={0}>{'No Items'}</td></tr>)
    )
}

export default TableRow;