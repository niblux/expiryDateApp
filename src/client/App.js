import './app.css';
import React, { useState } from 'react';
import FormComponent from './components/FormComponent';
import Header from './components/Header';


const App = (props) => {

  let formValues = [];

  const sendFormValues = (values) => {
    this.setState({ formValues: values });
  };

  const initData = async () => {
    const request = await fetch('http://localhost:8080/items');
    const data = await request.json();
    return data;
  };

  console.log('data', initData());


  // const [formItems, setItems] = useState(data);

  // const formItems = formValues.map((item, i) => {
  //   console.log('id', item._id);
  //   console.log('name', item.name);
  //   console.log('purchase', item.purchase);
  //   console.log('expiryDate', item.expiryDate);
  // });

  // console.log('mapped values', setItems);


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
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <FormComponent sendFormValues={sendFormValues} />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <button className="btn btn-info" onClick={initData}>Refresh</button>
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
                  <tr>

                  </tr>
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