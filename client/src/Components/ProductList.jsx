import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ProductView from "./ProductView";

function ProductList({ products }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 pb-3 pt-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) =>
            <div key={index} className="bg-gray-800 border rounded-xl pt-2 px-4 group relative">
              <div className="flex justify-center items-center overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 ">
                <img
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <div className="mt-4 flex justify-between ">
                <div className="flex flex-col justify-between">
                  <h3 className="text-sm text-gray-300 line-clamp-5">
                    <Link to={`/overview/${product._id}`} element={<ProductView />}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-200">{product.price}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList;