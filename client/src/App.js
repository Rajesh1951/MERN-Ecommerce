import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Components/Home";
import Navbar from './Components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={< Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
