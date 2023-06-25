import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function Payment() {
  const cart = useSelector(store => store.cart.items);
  const [details, setDetails] = useState({
    address: '',
    mobile: ''
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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold mb-2">User Details</h2>
          <div className="mb-4">
            <label htmlFor="address" className="block mb-1">
              Address:
            </label>
            <input name="address" type="text" id="address" className="w-full border rounded p-2" onChange={(e) => handleChange(e)} />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block mb-1">
              Mobile:
            </label>
            <input name="mobile" type="number" id="mobile" className="w-full border rounded p-2" onChange={(e) => handleChange(e)} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Payment Features</h2>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-1">
              Card Number:
            </label>
            <input type="text" id="cardNumber" className="w-full border rounded p-2" />
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block mb-1">
              Expiry Date:
            </label>
            <input type="text" id="expiryDate" className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Pay
      </button>
    </div>
  );

}

export default Payment