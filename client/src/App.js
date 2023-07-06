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
import RequiredAuth from './Components/RequiredAuth';
import { MyProvider } from './contexts/AuthContext';
import Payment from './Components/Payment';
import OrderHistoryPage from './Components/OrderHistory';
import Signup from './Components/Signup'
import About from './Components/About';
axios.defaults.withCredentials = true;
function App() {
  return (
    <MyProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div className="h-screen flex flex-col">
            <Navbar />
            <Routes>
              <Route path='/' element={< Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/sell' element={<Selling />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/about' element={<About />} />
              <Route path='/cart' element={<RequiredAuth><Cart /></RequiredAuth>} />
              <Route path='/payment' element={<RequiredAuth><Payment /></RequiredAuth>} />
              <Route path='/overview/:id' element={<RequiredAuth><ProductView /></RequiredAuth>} />
              <Route path='/orders' element={<RequiredAuth><OrderHistoryPage /></RequiredAuth>} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </MyProvider>
  );
}

export default App;
