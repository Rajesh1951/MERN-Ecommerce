import { useEffect, useState } from "react"

function ProductList({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-3 pt-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) =>
            <div key={index} className="group relative">
              <div className="flex justify-center items-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList;