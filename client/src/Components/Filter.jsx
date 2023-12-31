import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductList from './ProductList'
import axios from "axios"
import { backend } from '../constants'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filter() {
  const domain = backend
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [filterCheck, setFilterCheck] = useState('all');

  const sortOptions = [
    { name: 'Price: Low to High', current: false },
    { name: 'Price: High to Low', current: false },
    { name: 'Best Rating', current: false },
  ]
  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'all', label: 'All', checked: true },
        { value: 'fashion', label: 'Fashion', checked: false },
        { value: 'groceries', label: 'Groceries', checked: false },
        { value: 'electronics', label: 'Electronics', checked: false },
        { value: 'jewellery', label: 'Jewellery', checked: false },
        { value: 'cooking', label: 'Cooking', checked: false },
        { value: 'mobile', label: 'Mobile', checked: false },
        { value: 'watches', label: 'Watches', checked: false },
      ],
    },
  ]

  useEffect(() => {
    const fetch = async () => {
      let { data } = await axios.get(`${domain}/products`);
      setAllProducts(data);
      setProducts(data);
    }
    fetch();
  }, [])
  useEffect(() => {
    if (filterCheck === 'all') {
      setProducts(allProducts);
    }
    else {
      setProducts(allProducts.filter((e) =>
        (e.category).toLowerCase() === filterCheck.toLowerCase()
      ))
    }
  }, [filterCheck])
  const sortFunc = (sortCheck) => {
    if (sortCheck === '0') {
      let sorted = [...products].sort((x, y) => Number((x.price).replace(/[^0-9.-]+/g, "")) - Number((y.price).replace(/[^0-9.-]+/g, "")))
      setProducts(sorted)
    }
    else if (sortCheck === '1') {
      let sorted = [...products].sort((x, y) => Number((y.price).replace(/[^0-9.-]+/g, "")) - Number((x.price).replace(/[^0-9.-]+/g, "")))
      setProducts(sorted)
    }
    else {
      let sorted = [...products].sort((x, y) => parseFloat(y.rating) - parseFloat(x.rating))
      setProducts(sorted)
    }
  }

  return (
    <div className="bg-gray-900 mt-16">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-300">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  bg-gray-900 p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6 bg-gray-900">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root bg-gray-900">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-gray-900 px-2 py-3 text-gray-300 hover:text-gray-200">
                                <span className="font-medium ">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="radio"
                                      defaultChecked={option.checked}
                                      onChange={(e) => setFilterCheck(e.target.value)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-300">Products List</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-gray-200">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-300 group-hover:text-gray-200"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-900 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option, index) => (
                        <Menu.Item key={option.name}
                          onClick={() => sortFunc(String(index))}
                        >
                          {({ active }) => (
                            <a
                              className={classNames(
                                option.current ? 'font-medium text-gray-300' : 'text-gray-300',
                                active ? 'bg-gray-800' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between  bg-gray-900 py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-300">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-1">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="radio"
                                  defaultChecked={option.checked}
                                  onChange={(e) => setFilterCheck(e.target.value)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-300"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>

                      </>
                    )}
                  </Disclosure>
                ))}

              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{<ProductList products={products} />}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}