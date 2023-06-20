import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import Selling from './Components/Selling';
import Cart from './Components/Cart';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/sell' element={<Selling />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
