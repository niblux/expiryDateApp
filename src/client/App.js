import './app.css';
import React, { useState, useEffect } from 'react';
import FormComponent from './components/FormComponent';
import Header from './components/Header';


const App = (props) => {

  let formValues = []

  const [data, setValues] = useState(formValues);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch('http://localhost:8080/items');
      const data = await request.json();
      setValues(data);
    };
    fetchData();
  }, []);

  // const deleteUser = (id) => {
  //   setValues(data.filter(item => item.id != id));
  // }

  return (
    <>
      <Header />
      <main role="main">
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">Expiry App</h1>
            <p className="lead te§xt-muted">Basic application used to store all your food item purchases perishables, spices, nuts, seeds, formulas etc. The app is
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
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <FormComponent />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Item Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Purchase Date</th>
                    <th scope="col">Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (data.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.purchase}</td>
                      <td>{item.expiryDate}</td>
                      <td>{item.notes}</td>
                      {/* <td><button onClick={deleteUser(item.id)} type="button" class="btn btn-danger">Delete</button></td> */}
                    </tr>
                  ))) : (<tr> No items </tr>)}
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