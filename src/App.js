
import './App.css';
import HomePage from "./pages/HomePage";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from './pages/Error';
import Footer from './components/Footer';

// è anche responsive

function App() {
  return (
    <div className="App">
     
     <Router>
        <NavBar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='*' element={<Error />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
