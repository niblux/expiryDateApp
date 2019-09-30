import './app.css';
import React, { useState, useEffect } from 'react';
import FormComponent from './components/FormComponent';
import TableRow from './components/TableRow';
import Header from './components/Header';
import { makeRequest } from '../helpers'


const App = () => {

  let initItems = { foodName: '', foodType: '', purchaseDate: '', expiryDate: '', notes: '', editing: false };

  const [items, setValues] = useState(initItems);
  const [currentItem, setCurrentItem] = useState(initItems)

  const editingRow = (item) => {
    setEditing(true);
    // setCurrentItem({ foodName: item.foodName, foodType: item.foodType, purchaseDate: item.purchaseDate, expiryDate: item.expiryDate, notes: item.notes });
  }

  const addItems = (e, payload) => {
    console.log('PAYLOAD ADD', payload);
    e.preventDefault();
    setValues([...items, payload]);
    makeRequest('http://localhost:8080/create', "POST", payload)
      .then(data => console.log('POSTED DATA', data))
      .catch(error => console.error(error));
  }

  const updateItems = async (currentItem) => {
    console.log('fe item', currentItem);
    items.map(item => {
      if (currentItem._id === item._id) {
        setValues([...items, currentItem]);
      }
    });
    // makeRequest(`http://localhost:8080/update/${updatedItem._id}`, "PUT", updatedItem)
    //   .then(data => {
    //     console.log('POSTED DATA', data)
    //   })
    //   .catch(error => console.error(error));
    // setValues(items.map(item => (item._id === updatedItem._id ? updatedItem : item)))
  }

  useEffect(() => {
    setCurrentItem(currentItem)
  }, [currentItem]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('http://localhost:8080/items');
      const data = await request.json();
      console.log('data', data);
      setValues(data);
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    return fetch(`http://localhost:8080/delete/${id}`, {
      method: 'delete'
    }).then(response =>
      response.json().then(json => {
        setValues(items.filter(item => item._id != id));
        return json;
      })
    );
  }

  return (
    <>
      <Header />
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Expiry App</h1>
            <p className="lead text-muted">Basic application used to store all your food item purchases perishables, spices, nuts, seeds, formulas etc. The app is
              designed to remind you when the item is expiring so you will always know when to top up.</p>
            <p>
              <a href="#" className="btn btn-primary my-2">Main call to action</a>
              <br></br>
              <a href="#" className="btn btn-secondary my-2">Secondary action</a>
            </p>
          </div>
        </section>

        <div className="container-fluid">
          <div className="row text-left">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <FormComponent addItems={addItems} />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Purchase Date</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow updateItems={updateItems} items={items} ></TableRow>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;