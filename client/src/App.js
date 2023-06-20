import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import Navbar from './Components/Navbar';
import SignIn from './Components/SignIn';
import Selling from './Components/Selling';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={< Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/sell' element={<Selling />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
