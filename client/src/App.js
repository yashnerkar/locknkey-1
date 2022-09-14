import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Final from './components/Final';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} ></Route >
          <Route path="/register" element={<Register />} ></Route >
          <Route path="/login" element={<Login />} ></Route >
          <Route path="/game" element={<Game />} ></Route >
          <Route path="/final" element={<Final />}></Route>
        </Routes>
      </Router >
    </div >
  );
}

export default App;
