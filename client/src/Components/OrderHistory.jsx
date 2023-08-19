import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { backend } from '../constants';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function OrderHistory() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const domain = backend
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Fetch order details from the backend
    axios
      .get(`${domain}/orders`, {
        headers: {
          Authorisation: `Bearer ${sessionStorage.getItem('jwtToken')}`
        }
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  if (orders.length === 0)
    return <></>
  function handleStars(n) {
    let s = Number(n);
    let stars = [];

    for (let i = 0; i < 5; i++) {
      if (s >= 1) {
        stars.push(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 inline -mt-1">
          <path fill='gold' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>)
      }
      else if (s >= 0.5) {
        stars.push(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-5 h-5 inline -mt-1">
          <path fill="gold" strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="gold" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        )
      }
      else {
        stars.push(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke='gold' className="w-5 h-5 inline -mt-1">
          <path fill='white' strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>)
      }
      s--;
    }
    return stars
  }
  return (
    <div className='flex-1 bg-gray-900 mt-16'>
      <div className="flex mt-8 max-w-8xl  sm:px-6 lg:px-8">
        <div className=" mx-auto lg:w-7/12 md:8/12">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              <h1 className='text-5xl'>Order history</h1>
              {orders.map((product, index) => {
                return <>
                  <div key={index} className="overflow-hidden border-none">
                    <div className='border rounded-lg m-3 '>
                      <div className='p-4  mb-4 '>
                        {/* for 1st row */}
                        <div className='flex justify-between'>
                          <div
                            className='w-80 flex justify-between mb-2'
                          >
                            <ul>
                              <li>Order Id</li>
                              <li>{(product.orderId).slice((product.orderId).length - 8)}</li>
                            </ul>
                            <ul>
                              <li>Ordered Date</li>
                              <li>{`${(product.date).slice(8, 10)}-${(product.date).slice(5, 7)}-${(product.date).slice(0, 4)}`}</li>
                            </ul>
                            <ul>
                              <li>Price</li>
                              <li>₹{(product.price)}</li>
                            </ul>
                          </div>
                          <div
                          // className="flex justify-center items-center h-screen"
                          >
                            {windowWidth < 591 ? (
                              <>
                                <button
                                  className="ml-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                  onClick={toggleMenu}
                                >
                                  More
                                </button>
                                {isMenuOpen && (
                                  <div className="bg-gray-500 absolute right-0 mt-2 bg-gray-100 p-2 rounded-lg">
                                    <ul>
                                      <li><Link
                                        to={'#'}
                                        className={classNames(
                                          'hover:bg-gray-700 hover:text-white',
                                          'rounded-md  py-2 text-sm font-medium '
                                        )}
                                      >
                                        View Order
                                      </Link></li>
                                      <Link
                                        to={'#'}
                                        className={classNames(
                                          'hover:bg-gray-700 hover:text-white',
                                          'rounded-md py-2 text-sm font-medium '
                                        )}
                                      >
                                        View Invoice
                                      </Link>
                                    </ul>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <Link
                                  to={'#'}
                                  className={classNames(
                                    'bg-gray-600 hover:bg-gray-700 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium '
                                  )}
                                >
                                  View Order
                                </Link>
                                <Link
                                  to={'#'}
                                  className={classNames(
                                    'bg-gray-600 hover:bg-gray-700 hover:text-white',
                                    'rounded-md mx-1 px-3 py-2 text-sm font-medium '
                                  )}
                                >
                                  View Invoice
                                </Link>
                              </>
                            )}

                          </div>
                        </div>
                        <hr />
                        {product.products.map((order, index) => {
                          return <li key={index} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={order.images[0]}
                                alt={order.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-300">
                                  <h3>
                                    <Link to={`http://localhost:3000/overview/${order._id}`}>{order.name}</Link>
                                  </h3>
                                </div>
                                <p className="mt-1 text-sm text-gray-200">{order.price}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-400">Ratings: <span className='font-bold text-gray-300'>{order.rating}</span>
                                  <ul className='inline'>
                                    {handleStars(order.rating).map((e, i) => <li key={i} className='inline'>{e}</li>)}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        })}
                      </div >
                    </div>
                  </div>
                </>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

export default OrderHistory