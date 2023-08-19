import { useContext, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "../contexts/AuthContext";
import { backend } from "../constants";
export default function Login() {
  const navigate = useNavigate();
  const { loggedIn } = useContext(MyContext);
  const domain = backend;
  const [credential, setCredential] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${domain}/login`, {
      email: credential.email,
      password: credential.password
    })
    if (data?.error) {
      alert(data?.error)
    }
    else {
      alert('login succesful')
      sessionStorage.setItem('jwtToken',data);
      loggedIn()
      navigate('/')
    }
    console.log('data',data);
  }
  return (
    <div className="flex-1 bg-gray-900 mt-16">
      <div className="flex flex-1 flex-col justify-center px-6 py-14 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://media.istockphoto.com/id/1355944902/vector/letter-e-sign-design-template-modern-colorful-vector-emblem.jpg?s=612x612&w=0&k=20&c=3K1uqqLfUDmeTVSPkZw078_j7TSk5AZ7uF0Ko_PiDtk="
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => handleChange(e)}
                  placeholder="asd@gmail.com"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => handleChange(e)}
                  placeholder="asd"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => handleLogin(e)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not Registered?{' '}
            <a href="/signup" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}