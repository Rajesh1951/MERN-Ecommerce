import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Selling from './Components/Selling';
import Cart from './Components/Cart';
import { Provider } from 'react-redux';
import store from './redux/store'
import ProductView from "./Components/ProductView"
import axios from 'axios'
axios.defaults.withCredentials = true;
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={< Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sell' element={<Selling />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/overview/:id' element={<ProductView />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
