import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"

function App() {

  const [product] = useState ({
    name: "React form FB",
    price: 10,
    productBy: "facebook"
  });


  const makePayment = token => {
    const body = {
      token, 
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then (response => {
      console.log("RESPONSE", response)
      const {status} = response;
      console.log("STATUS", status)
    })
    .catch(error => console.log(error));


  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
         
        <a 
        className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Product
        </a>
        <StripeCheckout 
         stripeKey= "pk_test_51OpRJRDnpmBpKgRUUGHFVaKiCC8YmF8y5ON1RrrBk2LB8kOXDZcWQKP4dk5mLBf6yGEiIi3bkhsGaO0S1shOLvjs007HCcsUsF"
         token = {makePayment}
         name = "Buy Product"
         amount= {product.price * 100}
         shippingAddress
         billingAddress
         >
           <button className = "btn-large pink">
            The price is {product.price} $ 
          </button>

        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
