import './app.css';
import React, { Component } from 'react';
import FormComponent from './components/FormComponent';
import Header from './components/Header';
export default class App extends Component {

  constructor(props) {
    super(props);
    const formValues = {};

    this.state = {
      formValues: {}
    }
  }

  sendFormValues = (values) => {
    this.setState({ formValues: values });
  }

  render() {
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
              <div className="col-md-7">
                <div className="card">
                  <div className="card-body">
                    <FormComponent sendFormValues={this.sendFormValues} />
                  </div>
                </div>
              </div>
              <div className="col-md-5">

              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
