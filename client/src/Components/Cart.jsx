import { useDispatch, useSelector } from "react-redux"
import { removeItem } from "../redux/cartSlice"
import { Link } from "react-router-dom";
import { useState } from "react";
import Payment from "./Payment";

export default function Cart() {
  let price = 0;
  const products = useSelector(store => store.cart.items)
  const dispatch = useDispatch()
  function handleRemove(index) {
    dispatch(removeItem(index));
  }
  function handleBuy() {

  }
  return (
    <div className="flex mt-24 max-w-7xl  sm:px-6 lg:px-8 ">
      <div className=" mx-auto w-7/12 ">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
          <h1 className="text-4xl font-bold tracking-tight text-gray-300">Your Cart</h1>
            {products.map((product, index) => {
              price += Number((product.price).replace(/[^0-9.-]+/g, ""))
              return <li key={index} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-300">
                      <h3>
                        <Link href={product.href}>{product.name}</Link>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-400">Qty {product.quantity}</p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-blue-400 hover:text-indigo-500"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
      <div className="w-3/12">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-800 space-y-6   ">
          <h3 className="text-xl font-semibold leading-5 text-gray-300">Summary</h3>
          <div className="flex justify-center items-center w-full s2ace-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between  w-full">
              <p className="text-base leading-4 text-gray-300">Subtotal</p>
              <p className="text-base leading-4 text-gray-200">₹{price}.00</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base leading-4 text-gray-300">Shipping</p>
              <p className="text-base leading-4 text-gray-200">₹100.00</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base font-semibold leading-4 text-gray-300">Total</p>
            <p className="text-base font-semibold leading-4 text-gray-200">₹{price + 100}.00</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <Link to='/payment' element={<Payment />}>
              <button onClick={() => handleBuy()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Buy
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
