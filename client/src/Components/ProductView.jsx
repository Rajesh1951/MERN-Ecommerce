import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { addItem } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductView() {
  const { id } = useParams()
  const domain = 'https://mern-ecommerce-3vx2.onrender.com'
  const [product, setProduct] = useState({
    name: '',
    price: '',
    images: ['', ''],
    description: '',
    rating: ''
  });
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`${domain}/overview/${id}`)
      setProduct(data);
    }
    fetch();
  }, [])

  // redux 
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem({
      id: id,
      name: product.name,
      href: `/overview/${id}`,
      price: product.price,
      quantity: 1,
      imageSrc: product.images[0],
      imageAlt: product.name,
    }))

  }
  return (
    <div className="bg-gray-900 text-gray-300">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm">
              <Link aria-current="page" className="font-medium text-gray-400 hover:text-gray-300">
                {product.name}
              </Link>
            </li>
          </ol>
        </nav>
        <div className="mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="flex justify-center items-center rounded-lg">
            <img
              src={product.images[0]}
              alt="image"
              className='px-2'
            />
          </div>
          {/* product info 1*/}
          <div className="mx-auto  px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-3xl">{product.name}</h1>
            </div>


            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-300">{product.description}</p>
                </div>
              </div>
            </div>
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-300">Rs.{product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <a href="#" className="ml-3 text-sm font-medium text-blue-500 hover:text-blue-400">
                    {Math.floor(Math.random() * 100)} reviews
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-400"
                  onClick={() => handleAddItem()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
