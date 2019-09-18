import './app.css';
import React, { useState, useEffect } from 'react';
import FormComponent from './components/FormComponent';
import Header from './components/Header';
import { makeRequest } from '../helpers'
  

const App = () => {

  let initItems = { foodName: '', foodType: '', purchaseDate: '', expiryDate: '', notes: '' };

  const [items, setValues] = useState(initItems);

  const addItems = (e, payload) => {
    e.preventDefault();
    setValues([ ...items, payload ]);
    makeRequest('http://localhost:8080/create', "POST", payload)
      .then(data => console.log('POSTED DATA', data))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('http://localhost:8080/items');
      const data = await request.json();
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
                  <FormComponent addItems={addItems}/>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Item Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Purchase Date</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (items.map((item, index) => (
                    <tr key={item._id}>
                      <td>{item.foodName}</td>
                      <td>{item.foodType}</td>
                      <td>{item.purchaseDate}</td>
                      <td>{item.expiryDate}</td>
                      <td>{item.notes}</td>
                      <td><button onClick={() => deleteUser(item._id)} type="button" className="btn btn-danger">Delete</button></td>
                    </tr>
                  ))) : (<tr><td key={0}>{'No Items'}</td></tr>)}
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