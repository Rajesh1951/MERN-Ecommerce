import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { backend } from '../constants';

function Payment() {
  const domain = backend;
  const cart = useSelector(store => store.cart.items);
  let price = 100;
  const productIds = cart.map(e => {
    price += Number((e.price).replace(/[^0-9.-]+/g, ""))
    return e.id;
  })
  const [details, setDetails] = useState({
    address: '',
    orderName: ''
  })
  function handleChange(event) {
    const { name, value } = event.target;
    setDetails(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  async function handlePay() {
    const result = await axios.post(`${domain}/create`, { ...details, productIds, price }, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwtToken')}`
      }
    })
    alert("Order is Succesfull")
  }
  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">User Details</h2>
          <div className="mb-4">
            <label htmlFor="orderName" className="block mb-1">
              Order Name:
            </label>
            <input name="orderName" type="text" id="orderName" className="text-gray-800 w-full border rounded p-2" onChange={(e) => handleChange(e)} />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">
              Address:
            </label>
            <input name="address" type="text" id="address" className="text-gray-800 w-full border rounded p-2" onChange={(e) => handleChange(e)} />
          </div>

        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Payment Features</h2>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-1">
              Card Number:
            </label>
            <input type="text" id="cardNumber" className="text-gray-800 w-full border rounded p-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block mb-1">
              Expiry Date:
            </label>
            <input type="text" id="expiryDate" className="text-gray-800 w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <button onClick={() => handlePay()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Pay
      </button>
    </div>
  );

}

export default Payment